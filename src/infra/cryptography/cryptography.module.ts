import { Encrypter } from '@/domain/smart-menu/application/cryptography/encrypter'
import { HashComparer } from '@/domain/smart-menu/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/smart-menu/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
