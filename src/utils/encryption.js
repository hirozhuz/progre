import {JSEncrypt} from 'jsencrypt'
import {PUBLIC_KEY} from '@config'

export default function (password) {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(PUBLIC_KEY)
    return encrypt.encrypt(password)
}
