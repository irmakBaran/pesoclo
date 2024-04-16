import { Messenger } from '@klarna-web-sdk/messenger/messenger'
import { EErrorTypes } from '@klarna-web-sdk/payment/src/constants'
import { CustomError } from '@klarna-web-sdk/payment/src/utils/handleError'
import { TypeOf } from 'zod'

import { MethodsSchema } from './schema'
import type { MethodsKey, MethodsSchemaType, SdkConfigSchemaType } from './types'
import { ApiError } from './utils'

const FRAME_ID = 'klarna-communication-iframe'

/**
 * BackendBridge is a wrapper around Messenger class that provides
 * a communication channel between Web SDK and a klarna hosted iframe
 * for backend communication.
 *
 * This is the interface for Web SDK (or any other integrated packages)
 * to communicate with backend. Any method that can be called
 * should also have a corresponding handler in receiver file. Otherwise
 * the promise will never be resolved.
 */
export class BackendBridge {
  private messenger: Messenger
  private initialized: boolean

  constructor() {
    this.initialized = false
  }

  private async createTarget(baseUrl: string = ''): Promise<{
    target: HTMLIFrameElement
    src: string
  }> {
    return new Promise((resolve, reject) => {
      try {
        const src = `${baseUrl}backend_bridge_iframe.html`

        const existingIframe = document.querySelector(`#${FRAME_ID}`) as HTMLIFrameElement
        if (existingIframe) resolve({ target: existingIframe, src })

        const iframe = document.createElement('iframe')
        iframe.src = src
        iframe.id = FRAME_ID
        iframe.style.cssText = 'display:none!important'
        document.body.appendChild(iframe)

        iframe.onload = () => resolve({ target: iframe, src })
      } catch (error) {
        reject(error)
      }
    })
  }

  public async init(config: SdkConfigSchemaType) {
    try {
      const { target } = await this.createTarget(config.baseUrl)

      this.messenger = new Messenger({ source: window, target })
      await this.messenger.initiateHandshake()

      this.initialized = true

      await this.call({ method: 'paymentApiSetup', data: config })
    } catch (error) {
      throw new Error('BackendBridge: init failed')
    }
  }

  public async call<K extends MethodsKey>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: MethodsSchemaType[K] extends { data: any }
      ? { method: K; data: TypeOf<MethodsSchemaType[K]['data']> }
      : { method: K; data?: never }
  ): Promise<TypeOf<MethodsSchemaType[K]['response']>> {
    if (!this.initialized) {
      throw new CustomError(EErrorTypes.TECHNICAL_ERROR, 'Bridge not initialized')
    }

    const parsedRequest = MethodsSchema[params.method].data.safeParse(params.data)
    if (parsedRequest.success === false) {
      throw new CustomError(EErrorTypes.TECHNICAL_ERROR, 'Invalid request', parsedRequest.error)
    }

    return this.messenger
      .postMessageToTarget({
        method: params.method,
        data: parsedRequest.data,
      })
      .then((response) => {
        const parsedResponse = MethodsSchema[params.method].response.safeParse(response)
        if (parsedResponse.success === false) {
          throw new CustomError(
            EErrorTypes.RESOURCE_ERROR,
            'Invalid response',
            parsedResponse.error
          )
        }
        return parsedResponse.data
      })
      .catch((error) => {
        // messenger cannot transfer error instances, we have to check for known properties
        if (
          Object.prototype.hasOwnProperty.call(error, 'status') &&
          Object.prototype.hasOwnProperty.call(error, 'statusText') &&
          Object.prototype.hasOwnProperty.call(error, 'response')
        ) {
          throw new ApiError(error)
        } else {
          throw new CustomError(EErrorTypes.TECHNICAL_ERROR, 'Unexpected error', error)
        }
      })
  }
}

export const backendBridge = new BackendBridge()
