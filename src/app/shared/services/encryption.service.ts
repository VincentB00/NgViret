import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import * as CryptoTS from 'crypto-ts';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor(private userService: UserService) { }

  encryptArray(object: any[]): any[]
  {
    let newObject: any = [];

    object.forEach((value) => {
      
      let newValue;

      if(typeof value === 'string')
        newValue = this.encryptionAES(value);
      else if(Array.isArray(value))
        newValue = this.encryptArray(value);
      else if(typeof value === 'object')
        newValue = this.encryptObject(value);
      else
        newValue = value;

      newObject.push(newValue);
    })

    return newObject;
  }


  encryptObject(object: any): any
  {
    let newObject = {};

    for (const [key, value] of Object.entries(object)) 
    {
      let newValue;
      if(key === 'publicKey' && typeof value === 'string')
        newValue = value;
      else if(typeof value === 'string')
        newValue = this.encryptionAES(value);
      else if(Array.isArray(value))
        newValue = this.encryptArray(value);
      else if(typeof value === 'object')
        newValue = this.encryptObject(value);
      else
        newValue = value;

      Object.defineProperty(newObject, key, {
        value: newValue,
        writable: true,
        enumerable: true
      })
    }

    return newObject;
  }

  decryptArray(object: any[]): any[]
  {
    let newObject: any = [];

    object.forEach((value) => {
      
      let newValue;

      if(typeof value === 'string')
        newValue = this.decryptionAES(value);
      else if(Array.isArray(value))
        newValue = this.decryptArray(value);
      else if(typeof value === 'object')
        newValue = this.decryptObject(value);
      else
        newValue = value;

      newObject.push(newValue);
    })

    return newObject;
  }


  decryptObject(object: any): any
  {
    let newObject = {};

    for (const [key, value] of Object.entries(object)) 
    {
      let newValue;
      if(key === 'publicKey' && typeof value === 'string')
        newValue = value;
      else if(typeof value === 'string')
        newValue = this.decryptionAES(value);
      else if(Array.isArray(value))
        newValue = this.decryptArray(value);
      else if(typeof value === 'object')
        newValue = this.decryptObject(value);
      else
        newValue = value;

      Object.defineProperty(newObject, key, {
        value: newValue,
        writable: true,
        enumerable: true
      })
    }

    return newObject;
  }

  encryptionAES (msg: string) 
  {
    // Encrypt
    const ciphertext = CryptoTS.AES.encrypt(msg, this.userService.getCurrentLoginUser().publicKey!);
    return ciphertext.toString();
  }

  decryptionAES (msg: string) 
  {
    // Decrypt
    const bytes  = CryptoTS.AES.decrypt(msg, this.userService.getCurrentLoginUser().publicKey!);
    const plaintext = bytes.toString(CryptoTS.enc.Utf8);
    return plaintext;
  }

  encryptArrayWithKey(object: any[], pKey: string): any[]
  {
    let newObject: any = [];

    object.forEach((value) => {
      
      let newValue;

      if(typeof value === 'string')
        newValue = this.encryptionAESWithKey(value, pKey);
      else if(Array.isArray(value))
        newValue = this.encryptArrayWithKey(value, pKey);
      else if(typeof value === 'object')
        newValue = this.encryptObjectWithKey(value, pKey);
      else
        newValue = value;

      newObject.push(newValue);
    })

    return newObject;
  }


  encryptObjectWithKey(object: any, pKey: string): any
  {
    let newObject = {};

    for (const [key, value] of Object.entries(object)) 
    {
      let newValue;
      if(key === 'publicKey' && typeof value === 'string')
        newValue = value;
      else if(typeof value === 'string')
        newValue = this.encryptionAESWithKey(value, pKey);
      else if(Array.isArray(value))
        newValue = this.encryptArrayWithKey(value, pKey);
      else if(typeof value === 'object')
        newValue = this.encryptObjectWithKey(value, pKey);
      else
        newValue = value;

      Object.defineProperty(newObject, key, {
        value: newValue,
        writable: true,
        enumerable: true
      })
    }

    return newObject;
  }

  decryptArrayWithKey(object: any[], pKey: string): any[]
  {
    let newObject: any = [];

    object.forEach((value) => {
      
      let newValue;

      if(typeof value === 'string')
        newValue = this.decryptionAESWithKey(value, pKey);
      else if(Array.isArray(value))
        newValue = this.decryptArrayWithKey(value, pKey);
      else if(typeof value === 'object')
        newValue = this.decryptObjectWithKey(value, pKey);
      else
        newValue = value;

      newObject.push(newValue);
    })

    return newObject;
  }


  decryptObjectWithKey(object: any, pKey: string): any
  {
    let newObject = {};

    for (const [key, value] of Object.entries(object)) 
    {
      let newValue;
      if(key === 'publicKey' && typeof value === 'string')
        newValue = value;
      else if(typeof value === 'string')
        newValue = this.decryptionAESWithKey(value, pKey);
      else if(Array.isArray(value))
        newValue = this.decryptArrayWithKey(value, pKey);
      else if(typeof value === 'object')
        newValue = this.decryptObjectWithKey(value, pKey);
      else
        newValue = value;

      Object.defineProperty(newObject, key, {
        value: newValue,
        writable: true,
        enumerable: true
      })
    }

    return newObject;
  }

  encryptionAESWithKey (msg: string, key: string) 
  {
    // Encrypt
    const ciphertext = CryptoTS.AES.encrypt(msg, key);
    return ciphertext.toString();
  }

  decryptionAESWithKey (msg: string, key: string) 
  {
    // Decrypt
    const bytes  = CryptoTS.AES.decrypt(msg, key);
    const plaintext = bytes.toString(CryptoTS.enc.Utf8);
    return plaintext;
  }

}
