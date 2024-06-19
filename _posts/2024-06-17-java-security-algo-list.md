---
title: 列出java支持的加密,散列,签名算法 
---


以`Cipher`开头的, 可以用`Cipher.getInstance(name)`获取
别的类型类推

Signature.开头的支持签名, 以 Cipher 开头的支持加密, 以 MessageDigest 开头的支持散列


```java
import java.security.Security;
import java.util.HashSet;

public class AlgoListMain {
    public static void main(String[] args) {

        var set = new HashSet<>();
        var pds = Security.getProviders();
        for (var p: pds) {
            System.out.println("提供者类" + p.getClass());
            for (var entry : p.entrySet() ) {
                var key = entry.getKey().toString();
                var pos = key.indexOf('.');
                if (pos >= 0) {
                    var type = key.substring(0, pos);
                    set.add(type);
                }

                var value = entry.getValue();
                System.out.println("===================");
                System.out.println("key = " + key);
                System.out.println("value = " + value);
            }
        }
        System.out.println("算法分类 = " + set);
    }
}
```


以下为一个java版本的输出
```
提供者类class sun.security.provider.Sun
===================
key = Signature.SHA3-384withDSA ImplementedIn
value = Software
===================
key = Alg.Alias.MessageDigest.SHA512/224
value = SHA-512/224
===================
key = Signature.SHA384withDSA KeySize
value = 3072
===================
key = Alg.Alias.KeyPairGenerator.1.2.840.10040.4.1
value = DSA
===================
key = CertPathValidator.PKIX
value = sun.security.provider.certpath.PKIXCertPathValidator
===================
key = Signature.SHA3-384withDSA KeySize
value = 3072
===================
key = MessageDigest.SHA-256 ImplementedIn
value = Software
===================
key = MessageDigest.SHA-512/224
value = sun.security.provider.SHA5$SHA512_224
===================
key = MessageDigest.SHA-512/224 ImplementedIn
value = Software
===================
key = CertStore.com.sun.security.IndexedCollection ImplementedIn
value = Software
===================
key = Alg.Alias.CertificateFactory.X509
value = X.509
===================
key = Alg.Alias.Signature.SHA-1/DSA
value = SHA1withDSA
===================
key = MessageDigest.SHA3-384
value = sun.security.provider.SHA3$SHA384
===================
key = Signature.SHA1withDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
===================
key = Signature.SHA224withDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.8
value = SHA3-512withDSA
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.6
value = SHA3-256withDSA
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.7
value = SHA3-384withDSA
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.4
value = SHA512withDSA
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.5
value = SHA3-224withDSA
===================
key = Alg.Alias.MessageDigest.OID.1.2.840.113549.2.2
value = MD2
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.2
value = SHA256withDSA
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.3
value = SHA384withDSA
===================
key = Alg.Alias.MessageDigest.OID.1.2.840.113549.2.5
value = MD5
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.1
value = SHA224withDSA
===================
key = Signature.SHA3-256withDSA ImplementedIn
value = Software
===================
key = Signature.SHA384withDSAinP1363Format
value = sun.security.provider.DSA$SHA384withDSAinP1363Format
===================
key = Alg.Alias.Signature.DSAWithSHA1
value = SHA1withDSA
===================
key = Signature.SHA384withDSA
value = sun.security.provider.DSA$SHA384withDSA
===================
key = Signature.SHA3-384withDSA
value = sun.security.provider.DSA$SHA3_384withDSA
===================
key = CertPathBuilder.PKIX
value = sun.security.provider.certpath.SunCertPathBuilder
===================
key = Provider.id version
value = 20
===================
key = MessageDigest.SHA-512/256 ImplementedIn
value = Software
===================
key = Alg.Alias.MessageDigest.SHA224
value = SHA-224
===================
key = CertPathBuilder.PKIX ValidationAlgorithm
value = RFC5280
===================
key = Alg.Alias.MessageDigest.SHA
value = SHA-1
===================
key = Provider.id className
value = sun.security.provider.Sun
===================
key = MessageDigest.SHA-224
value = sun.security.provider.SHA2$SHA224
===================
key = CertPathBuilder.PKIX ImplementedIn
value = Software
===================
key = MessageDigest.SHA3-256
value = sun.security.provider.SHA3$SHA256
===================
key = Alg.Alias.MessageDigest.1.3.14.3.2.26
value = SHA-1
===================
key = Signature.SHA384withDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
===================
key = Signature.SHA3-512withDSA ImplementedIn
value = Software
===================
key = SecureRandom.SHA1PRNG
value = sun.security.provider.SecureRandom
===================
key = KeyFactory.DSA
value = sun.security.provider.DSAKeyFactory
===================
key = KeyPairGenerator.DSA KeySize
value = 2048
===================
key = SecureRandom.DRBG ImplementedIn
value = Software
===================
key = Alg.Alias.AlgorithmParameterGenerator.OID.1.2.840.10040.4.1
value = DSA
===================
key = Signature.NONEwithDSA
value = sun.security.provider.DSA$RawDSA
===================
key = Signature.SHA224withDSA ImplementedIn
value = Software
===================
key = Alg.Alias.Signature.DSS
value = SHA1withDSA
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.10
value = SHA3-512
===================
key = Signature.NONEwithDSA ImplementedIn
value = Software
===================
key = KeyStore.DKS ImplementedIn
value = Software
===================
key = KeyStore.DKS
value = sun.security.provider.DomainKeyStore$DKS
===================
key = Signature.SHA256withDSAinP1363Format
value = sun.security.provider.DSA$SHA256withDSAinP1363Format
===================
key = KeyStore.JKS ImplementedIn
value = Software
===================
key = Alg.Alias.Signature.DSA
value = SHA1withDSA
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.10040.4.1
value = DSA
===================
key = KeyStore.PKCS12
value = sun.security.pkcs12.PKCS12KeyStore$DualFormatPKCS12
===================
key = Alg.Alias.Signature.SHAwithDSA
value = SHA1withDSA
===================
key = Alg.Alias.MessageDigest.SHA512/256
value = SHA-512/256
===================
key = Alg.Alias.MessageDigest.SHA256
value = SHA-256
===================
key = MessageDigest.SHA3-224
value = sun.security.provider.SHA3$SHA224
===================
key = Signature.SHA1withDSA ImplementedIn
value = Software
===================
key = AlgorithmParameterGenerator.DSA KeySize
value = 2048
===================
key = Alg.Alias.Signature.SHA/DSA
value = SHA1withDSA
===================
key = CertPathValidator.PKIX ValidationAlgorithm
value = RFC5280
===================
key = Alg.Alias.MessageDigest.SHA384
value = SHA-384
===================
key = CertPathValidator.PKIX ImplementedIn
value = Software
===================
key = KeyPairGenerator.DSA ImplementedIn
value = Software
===================
key = Alg.Alias.KeyFactory.1.2.840.10040.4.1
value = DSA
===================
key = Signature.SHA512withDSA
value = sun.security.provider.DSA$SHA512withDSA
===================
key = MessageDigest.SHA3-384 ImplementedIn
value = Software
===================
key = Signature.SHA3-512withDSA KeySize
value = 3072
===================
key = Signature.SHA512withDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
===================
key = Signature.SHA3-512withDSAinP1363Format
value = sun.security.provider.DSA$SHA3_512withDSAinP1363Format
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.10040.4.1
value = DSA
===================
key = MessageDigest.SHA-512/256
value = sun.security.provider.SHA5$SHA512_256
===================
key = Signature.NONEwithDSAinP1363Format
value = sun.security.provider.DSA$RawDSAinP1363Format
===================
key = Alg.Alias.MessageDigest.OID.1.3.14.3.2.26
value = SHA-1
===================
key = Signature.SHA256withDSA
value = sun.security.provider.DSA$SHA256withDSA
===================
key = Signature.SHA224withDSAinP1363Format
value = sun.security.provider.DSA$SHA224withDSAinP1363Format
===================
key = CertStore.Collection ImplementedIn
value = Software
===================
key = Alg.Alias.KeyFactory.OID.1.2.840.10040.4.1
value = DSA
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.10
value = SHA3-512
===================
key = KeyPairGenerator.DSA
value = sun.security.provider.DSAKeyPairGenerator$Current
===================
key = Signature.SHA256withDSA KeySize
value = 2048
===================
key = Signature.SHA3-224withDSA
value = sun.security.provider.DSA$SHA3_224withDSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.1
value = SHA224withDSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.2
value = SHA256withDSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.3
value = SHA384withDSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.4
value = SHA512withDSA
===================
key = Signature.SHA3-512withDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
===================
key = Alg.Alias.AlgorithmParameterGenerator.1.2.840.10040.4.1
value = DSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.5
value = SHA3-224withDSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.6
value = SHA3-256withDSA
===================
key = Alg.Alias.KeyPairGenerator.OID.1.2.840.10040.4.1
value = DSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.7
value = SHA3-384withDSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.8
value = SHA3-512withDSA
===================
key = KeyStore.JKS
value = sun.security.provider.JavaKeyStore$DualFormatJKS
===================
key = Alg.Alias.Signature.SHA1/DSA
value = SHA1withDSA
===================
key = Signature.SHA224withDSA
value = sun.security.provider.DSA$SHA224withDSA
===================
key = Signature.SHA256withDSA ImplementedIn
value = Software
===================
key = Signature.SHA3-256withDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.1
value = SHA-256
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.3
value = SHA-512
===================
key = Signature.SHA3-512withDSA
value = sun.security.provider.DSA$SHA3_512withDSA
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.2
value = SHA-384
===================
key = Signature.SHA512withDSA KeySize
value = 3072
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.5
value = SHA-512/224
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.4
value = SHA-224
===================
key = Signature.SHA3-256withDSA KeySize
value = 2048
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.7
value = SHA3-224
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.6
value = SHA-512/256
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.9
value = SHA3-384
===================
key = Alg.Alias.KeyFactory.1.3.14.3.2.12
value = DSA
===================
key = Alg.Alias.MessageDigest.OID.2.16.840.1.101.3.4.2.8
value = SHA3-256
===================
key = Alg.Alias.Signature.RawDSA
value = NONEwithDSA
===================
key = Signature.SHA384withDSA ImplementedIn
value = Software
===================
key = Alg.Alias.MessageDigest.1.2.840.113549.2.5
value = MD5
===================
key = Signature.NONEwithDSA KeySize
value = 1024
===================
key = AlgorithmParameters.DSA ImplementedIn
value = Software
===================
key = Signature.SHA3-256withDSAinP1363Format
value = sun.security.provider.DSA$SHA3_256withDSAinP1363Format
===================
key = CertificateFactory.X.509 ImplementedIn
value = Software
===================
key = Alg.Alias.AlgorithmParameters.1.3.14.3.2.12
value = DSA
===================
key = Signature.SHA3-224withDSA ImplementedIn
value = Software
===================
key = Provider.id info
value = SUN (DSA key/parameter generation; DSA signing; SHA-1, MD5 digests; SecureRandom; X.509 certificates; PKCS12, JKS & DKS keystores; PKIX CertPathValidator; PKIX CertPathBuilder; LDAP, Collection CertStores, JavaPolicy Policy; JavaLoginConfig Configuration)
===================
key = Alg.Alias.MessageDigest.1.2.840.113549.2.2
value = MD2
===================
key = Signature.SHA3-256withDSA
value = sun.security.provider.DSA$SHA3_256withDSA
===================
key = MessageDigest.SHA-512 ImplementedIn
value = Software
===================
key = AlgorithmParameterGenerator.DSA ImplementedIn
value = Software
===================
key = Signature.SHA3-384withDSAinP1363Format
value = sun.security.provider.DSA$SHA3_384withDSAinP1363Format
===================
key = AlgorithmParameters.DSA
value = sun.security.provider.DSAParameters
===================
key = MessageDigest.SHA3-224 ImplementedIn
value = Software
===================
key = Provider.id name
value = SUN
===================
key = Alg.Alias.MessageDigest.SHA512
value = SHA-512
===================
key = MessageDigest.MD2
value = sun.security.provider.MD2
===================
key = MessageDigest.MD5
value = sun.security.provider.MD5
===================
key = MessageDigest.SHA-512
value = sun.security.provider.SHA5$SHA512
===================
key = Signature.SHA1withDSA KeySize
value = 1024
===================
key = Signature.SHA3-224withDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
===================
key = SecureRandom.SHA1PRNG ThreadSafe
value = true
===================
key = Alg.Alias.AlgorithmParameterGenerator.1.3.14.3.2.12
value = DSA
===================
key = MessageDigest.MD2 ImplementedIn
value = Software
===================
key = Alg.Alias.Signature.1.3.14.3.2.13
value = SHA1withDSA
===================
key = Signature.SHA1withDSA
value = sun.security.provider.DSA$SHA1withDSA
===================
key = CertificateFactory.X.509
value = sun.security.provider.X509Factory
===================
key = Alg.Alias.Signature.OID.1.2.840.10040.4.3
value = SHA1withDSA
===================
key = MessageDigest.SHA3-512
value = sun.security.provider.SHA3$SHA512
===================
key = Signature.SHA3-224withDSA KeySize
value = 2048
===================
key = MessageDigest.SHA3-512 ImplementedIn
value = Software
===================
key = MessageDigest.SHA-384 ImplementedIn
value = Software
===================
key = Signature.NONEwithDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
===================
key = Signature.SHA224withDSA KeySize
value = 2048
===================
key = SecureRandom.SHA1PRNG ImplementedIn
value = Software
===================
key = MessageDigest.SHA-256
value = sun.security.provider.SHA2$SHA256
===================
key = KeyStore.CaseExactJKS
value = sun.security.provider.JavaKeyStore$CaseExactJKS
===================
key = Policy.JavaPolicy
value = sun.security.provider.PolicySpiFile
===================
key = Signature.SHA3-384withDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
===================
key = Alg.Alias.MessageDigest.SHA1
value = SHA-1
===================
key = MessageDigest.SHA-224 ImplementedIn
value = Software
===================
key = Signature.SHA1withDSAinP1363Format
value = sun.security.provider.DSA$SHA1withDSAinP1363Format
===================
key = KeyFactory.DSA ImplementedIn
value = Software
===================
key = MessageDigest.SHA-1 ImplementedIn
value = Software
===================
key = SecureRandom.DRBG
value = sun.security.provider.DRBG
===================
key = CertStore.com.sun.security.IndexedCollection
value = sun.security.provider.certpath.IndexedCollectionCertStore
===================
key = CertStore.Collection
value = sun.security.provider.certpath.CollectionCertStore
===================
key = MessageDigest.SHA-384
value = sun.security.provider.SHA5$SHA384
===================
key = KeyStore.CaseExactJKS ImplementedIn
value = Software
===================
key = Alg.Alias.Signature.1.2.840.10040.4.3
value = SHA1withDSA
===================
key = MessageDigest.MD5 ImplementedIn
value = Software
===================
key = Configuration.JavaLoginConfig
value = sun.security.provider.ConfigFile$Spi
===================
key = Alg.Alias.Signature.1.3.14.3.2.27
value = SHA1withDSA
===================
key = Signature.SHA3-224withDSAinP1363Format
value = sun.security.provider.DSA$SHA3_224withDSAinP1363Format
===================
key = Alg.Alias.KeyPairGenerator.1.3.14.3.2.12
value = DSA
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.1
value = SHA-256
===================
key = AlgorithmParameterGenerator.DSA
value = sun.security.provider.DSAParameterGenerator
===================
key = MessageDigest.SHA-1
value = sun.security.provider.SHA
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.3
value = SHA-512
===================
key = SecureRandom.DRBG ThreadSafe
value = true
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.2
value = SHA-384
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.5
value = SHA-512/224
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.4
value = SHA-224
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.7
value = SHA3-224
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.6
value = SHA-512/256
===================
key = MessageDigest.SHA3-256 ImplementedIn
value = Software
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.9
value = SHA3-384
===================
key = Signature.SHA512withDSA ImplementedIn
value = Software
===================
key = Alg.Alias.MessageDigest.2.16.840.1.101.3.4.2.8
value = SHA3-256
===================
key = Signature.SHA512withDSAinP1363Format
value = sun.security.provider.DSA$SHA512withDSAinP1363Format
===================
key = Signature.SHA256withDSA SupportedKeyClasses
value = java.security.interfaces.DSAPublicKey|java.security.interfaces.DSAPrivateKey
提供者类class sun.security.rsa.SunRsaSign
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.12
value = SHA384withRSA
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.11
value = SHA256withRSA
===================
key = Alg.Alias.KeyPairGenerator.OID.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = Alg.Alias.KeyPairGenerator.1.2.840.113549.1.1.1
value = RSA
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.14
value = SHA224withRSA
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.13
value = SHA512withRSA
===================
key = Signature.SHA512/224withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.16
value = SHA3-512withRSA
===================
key = Signature.SHA3-256withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.15
value = SHA3-384withRSA
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.14
value = SHA3-256withRSA
===================
key = KeyFactory.RSASSA-PSS
value = sun.security.rsa.RSAKeyFactory$PSS
===================
key = Alg.Alias.KeyPairGenerator.PSS
value = RSASSA-PSS
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.13
value = SHA3-224withRSA
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.16
value = SHA512/256withRSA
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.15
value = SHA512/224withRSA
===================
key = KeyPairGenerator.RSA
value = sun.security.rsa.RSAKeyPairGenerator$Legacy
===================
key = Signature.SHA3-384withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.RSASSA-PSS SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.13
value = SHA3-224withRSA
===================
key = Alg.Alias.AlgorithmParameters.PSS
value = RSASSA-PSS
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.14
value = SHA3-256withRSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.15
value = SHA3-384withRSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.16
value = SHA3-512withRSA
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.2
value = MD2withRSA
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = Signature.SHA512withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA384withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA3-224withRSA
value = sun.security.rsa.RSASignature$SHA3_224withRSA
===================
key = Alg.Alias.KeyPairGenerator.OID.1.2.840.113549.1.1
value = RSA
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.5
value = SHA1withRSA
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.4
value = MD5withRSA
===================
key = Signature.SHA1withRSA
value = sun.security.rsa.RSASignature$SHA1withRSA
===================
key = Signature.SHA256withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA512/256withRSA
value = sun.security.rsa.RSASignature$SHA512_256withRSA
===================
key = Alg.Alias.KeyFactory.OID.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = Alg.Alias.KeyPairGenerator.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = KeyPairGenerator.RSASSA-PSS SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA3-512withRSA
value = sun.security.rsa.RSASignature$SHA3_512withRSA
===================
key = Signature.MD5withRSA
value = sun.security.rsa.RSASignature$MD5withRSA
===================
key = Signature.MD5withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA224withRSA
value = sun.security.rsa.RSASignature$SHA224withRSA
===================
key = KeyPairGenerator.RSASSA-PSS
value = sun.security.rsa.RSAKeyPairGenerator$PSS
===================
key = Signature.SHA3-224withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA512withRSA
value = sun.security.rsa.RSASignature$SHA512withRSA
===================
key = Alg.Alias.Signature.PSS
value = RSASSA-PSS
===================
key = Provider.id version
value = 20
===================
key = Alg.Alias.KeyPairGenerator.1.2.840.113549.1.1
value = RSA
===================
key = Alg.Alias.KeyFactory.1.2.840.113549.1.1.1
value = RSA
===================
key = Signature.RSASSA-PSS
value = sun.security.rsa.RSAPSSSignature
===================
key = Provider.id info
value = Sun RSA signature provider
===================
key = AlgorithmParameters.RSASSA-PSS
value = sun.security.rsa.PSSParameters
===================
key = Signature.SHA1withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA3-256withRSA
value = sun.security.rsa.RSASignature$SHA3_256withRSA
===================
key = Signature.SHA384withRSA
value = sun.security.rsa.RSASignature$SHA384withRSA
===================
key = Signature.MD2withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA512/256withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA3-384withRSA
value = sun.security.rsa.RSASignature$SHA3_384withRSA
===================
key = Provider.id className
value = sun.security.rsa.SunRsaSign
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.2
value = MD2withRSA
===================
key = Alg.Alias.Signature.1.3.14.3.2.29
value = SHA1withRSA
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = Alg.Alias.KeyFactory.OID.1.2.840.113549.1.1
value = RSA
===================
key = KeyFactory.RSA
value = sun.security.rsa.RSAKeyFactory$Legacy
===================
key = Signature.SHA256withRSA
value = sun.security.rsa.RSASignature$SHA256withRSA
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.15
value = SHA512/224withRSA
===================
key = Alg.Alias.KeyFactory.PSS
value = RSASSA-PSS
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.16
value = SHA512/256withRSA
===================
key = Provider.id name
value = SunRsaSign
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.11
value = SHA256withRSA
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.12
value = SHA384withRSA
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.13
value = SHA512withRSA
===================
key = Signature.SHA3-512withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.14
value = SHA224withRSA
===================
key = Alg.Alias.KeyFactory.1.2.840.113549.1.1
value = RSA
===================
key = Signature.SHA224withRSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.MD2withRSA
value = sun.security.rsa.RSASignature$MD2withRSA
===================
key = Alg.Alias.KeyFactory.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = KeyFactory.RSASSA-PSS SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Signature.SHA512/224withRSA
value = sun.security.rsa.RSASignature$SHA512_224withRSA
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.5
value = SHA1withRSA
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.4
value = MD5withRSA
提供者类class sun.security.ec.SunEC
===================
key = Alg.Alias.AlgorithmParameters.EllipticCurve
value = EC
===================
key = KeyAgreement.X448
value = sun.security.ec.XDHKeyAgreement.X448
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.12
value = SHA3-512withECDSA
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.11
value = SHA3-384withECDSA
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.10
value = SHA3-256withECDSA
===================
key = Signature.SHA1withECDSA ImplementedIn
value = Software
===================
key = Signature.SHA512withECDSA ImplementedIn
value = Software
===================
key = Signature.SHA512withECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = KeyPairGenerator.X448 ImplementedIn
value = Software
===================
key = Alg.Alias.KeyPairGenerator.OID.1.3.101.111
value = X448
===================
key = KeyFactory.X448
value = sun.security.ec.XDHKeyFactory.X448
===================
key = Alg.Alias.KeyPairGenerator.OID.1.3.101.110
value = X25519
===================
key = Alg.Alias.KeyPairGenerator.OID.1.3.101.113
value = Ed448
===================
key = Alg.Alias.KeyPairGenerator.OID.1.3.101.112
value = Ed25519
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.9
value = SHA3-224withECDSA
===================
key = Alg.Alias.Signature.1.3.101.112
value = Ed25519
===================
key = Alg.Alias.Signature.1.3.101.113
value = Ed448
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.10
value = SHA3-256withECDSA
===================
key = KeyFactory.EdDSA ImplementedIn
value = Software
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.11
value = SHA3-384withECDSA
===================
key = Alg.Alias.Signature.2.16.840.1.101.3.4.3.12
value = SHA3-512withECDSA
===================
key = Signature.Ed448 ImplementedIn
value = Software
===================
key = KeyAgreement.ECDH KeySize
value = 256
===================
key = Signature.SHA3-384withECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = Signature.SHA3-256withECDSAinP1363Format
value = sun.security.ec.ECDSASignature$SHA3_256inP1363Format
===================
key = Signature.SHA384withECDSA ImplementedIn
value = Software
===================
key = AlgorithmParameters.EC KeySize
value = 256
===================
key = Signature.SHA3-512withECDSA KeySize
value = 256
===================
key = Signature.SHA3-256withECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = Alg.Alias.KeyPairGenerator.EllipticCurve
value = EC
===================
key = Signature.SHA224withECDSA KeySize
value = 256
===================
key = Alg.Alias.Signature.OID.2.16.840.1.101.3.4.3.9
value = SHA3-224withECDSA
===================
key = KeyAgreement.ECDH ImplementedIn
value = Software
===================
key = KeyFactory.EC KeySize
value = 256
===================
key = Alg.Alias.KeyFactory.1.3.101.111
value = X448
===================
key = Alg.Alias.KeyFactory.1.3.101.112
value = Ed25519
===================
key = Signature.Ed448
value = sun.security.ec.ed.EdDSASignature.Ed448
===================
key = Alg.Alias.KeyFactory.1.3.101.110
value = X25519
===================
key = Alg.Alias.KeyFactory.OID.1.3.101.112
value = Ed25519
===================
key = Signature.SHA256withECDSA
value = sun.security.ec.ECDSASignature$SHA256
===================
key = KeyAgreement.ECDH SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = Alg.Alias.KeyFactory.OID.1.2.840.10045.2.1
value = EC
===================
key = Alg.Alias.KeyFactory.OID.1.3.101.111
value = X448
===================
key = Alg.Alias.KeyFactory.OID.1.3.101.110
value = X25519
===================
key = Alg.Alias.KeyFactory.1.3.101.113
value = Ed448
===================
key = Signature.SHA3-224withECDSAinP1363Format
value = sun.security.ec.ECDSASignature$SHA3_224inP1363Format
===================
key = Signature.SHA3-384withECDSAinP1363Format
value = sun.security.ec.ECDSASignature$SHA3_384inP1363Format
===================
key = Alg.Alias.KeyFactory.OID.1.3.101.113
value = Ed448
===================
key = KeyFactory.EC SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = KeyPairGenerator.EdDSA ImplementedIn
value = Software
===================
key = KeyFactory.XDH ImplementedIn
value = Software
===================
key = Signature.SHA3-384withECDSA
value = sun.security.ec.ECDSASignature$SHA3_384
===================
key = Alg.Alias.Signature.1.2.840.10045.4.3.4
value = SHA512withECDSA
===================
key = Signature.SHA512withECDSAinP1363Format
value = sun.security.ec.ECDSASignature$SHA512inP1363Format
===================
key = Alg.Alias.KeyPairGenerator.OID.1.2.840.10045.2.1
value = EC
===================
key = Signature.NONEwithECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = KeyFactory.EC
value = sun.security.ec.ECKeyFactory
===================
key = Alg.Alias.Signature.1.2.840.10045.4.3.2
value = SHA256withECDSA
===================
key = KeyAgreement.X25519 ImplementedIn
value = Software
===================
key = Alg.Alias.Signature.1.2.840.10045.4.3.3
value = SHA384withECDSA
===================
key = Provider.id version
value = 20
===================
key = Alg.Alias.KeyAgreement.OID.1.3.101.110
value = X25519
===================
key = Alg.Alias.Signature.OID.1.3.101.112
value = Ed25519
===================
key = Signature.SHA3-224withECDSA
value = sun.security.ec.ECDSASignature$SHA3_224
===================
key = Alg.Alias.Signature.OID.1.3.101.113
value = Ed448
===================
key = KeyPairGenerator.XDH
value = sun.security.ec.XDHKeyPairGenerator
===================
key = Provider.id info
value = Sun Elliptic Curve provider
===================
key = Alg.Alias.KeyAgreement.OID.1.3.101.111
value = X448
===================
key = KeyPairGenerator.XDH ImplementedIn
value = Software
===================
key = KeyPairGenerator.Ed25519 ImplementedIn
value = Software
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.1
value = SHA1withECDSA
===================
key = Signature.SHA384withECDSAinP1363Format
value = sun.security.ec.ECDSASignature$SHA384inP1363Format
===================
key = Alg.Alias.Signature.1.2.840.10045.4.3.1
value = SHA224withECDSA
===================
key = KeyPairGenerator.Ed448 ImplementedIn
value = Software
===================
key = Signature.SHA3-384withECDSA ImplementedIn
value = Software
===================
key = Provider.id className
value = sun.security.ec.SunEC
===================
key = Signature.SHA224withECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.10045.2.1
value = EC
===================
key = KeyPairGenerator.X25519
value = sun.security.ec.XDHKeyPairGenerator.X25519
===================
key = Signature.SHA256withECDSA ImplementedIn
value = Software
===================
key = Signature.Ed25519 ImplementedIn
value = Software
===================
key = Signature.SHA1withECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.10045.2.1
value = EC
===================
key = KeyFactory.Ed25519
value = sun.security.ec.ed.EdDSAKeyFactory.Ed25519
===================
key = Signature.SHA384withECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = KeyAgreement.XDH
value = sun.security.ec.XDHKeyAgreement
===================
key = Signature.SHA3-512withECDSA ImplementedIn
value = Software
===================
key = Provider.id name
value = SunEC
===================
key = KeyPairGenerator.EC
value = sun.security.ec.ECKeyPairGenerator
===================
key = KeyPairGenerator.EC ImplementedIn
value = Software
===================
key = Signature.EdDSA
value = sun.security.ec.ed.EdDSASignature
===================
key = Signature.EdDSA ImplementedIn
value = Software
===================
key = Signature.SHA256withECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = Signature.SHA3-384withECDSA KeySize
value = 256
===================
key = Signature.SHA3-512withECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = Signature.SHA512withECDSA KeySize
value = 256
===================
key = Signature.SHA3-224withECDSA ImplementedIn
value = Software
===================
key = Alg.Alias.KeyFactory.EllipticCurve
value = EC
===================
key = Signature.SHA1withECDSA KeySize
value = 256
===================
key = KeyPairGenerator.Ed25519
value = sun.security.ec.ed.EdDSAKeyPairGenerator.Ed25519
===================
key = Signature.SHA3-256withECDSA
value = sun.security.ec.ECDSASignature$SHA3_256
===================
key = Signature.NONEwithECDSA KeySize
value = 256
===================
key = KeyFactory.Ed448
value = sun.security.ec.ed.EdDSAKeyFactory.Ed448
===================
key = Signature.SHA256withECDSA KeySize
value = 256
===================
key = Signature.SHA3-256withECDSA KeySize
value = 256
===================
key = Alg.Alias.KeyFactory.1.2.840.10045.2.1
value = EC
===================
key = KeyPairGenerator.X448
value = sun.security.ec.XDHKeyPairGenerator.X448
===================
key = Signature.Ed25519
value = sun.security.ec.ed.EdDSASignature.Ed25519
===================
key = Signature.SHA256withECDSAinP1363Format
value = sun.security.ec.ECDSASignature$SHA256inP1363Format
===================
key = KeyFactory.XDH
value = sun.security.ec.XDHKeyFactory
===================
key = KeyPairGenerator.EdDSA
value = sun.security.ec.ed.EdDSAKeyPairGenerator
===================
key = Signature.NONEwithECDSA ImplementedIn
value = Software
===================
key = KeyFactory.EdDSA
value = sun.security.ec.ed.EdDSAKeyFactory
===================
key = Signature.SHA1withECDSAinP1363Format
value = sun.security.ec.ECDSASignature$SHA1inP1363Format
===================
key = KeyAgreement.X25519
value = sun.security.ec.XDHKeyAgreement.X25519
===================
key = Signature.SHA384withECDSA KeySize
value = 256
===================
key = Signature.SHA512withECDSA
value = sun.security.ec.ECDSASignature$SHA512
===================
key = Signature.SHA224withECDSA ImplementedIn
value = Software
===================
key = KeyAgreement.XDH ImplementedIn
value = Software
===================
key = KeyFactory.Ed448 ImplementedIn
value = Software
===================
key = KeyPairGenerator.EC KeySize
value = 256
===================
key = Signature.SHA384withECDSA
value = sun.security.ec.ECDSASignature$SHA384
===================
key = AlgorithmParameters.EC
value = sun.security.util.ECParameters
===================
key = KeyFactory.X25519 ImplementedIn
value = Software
===================
key = Signature.SHA3-512withECDSA
value = sun.security.ec.ECDSASignature$SHA3_512
===================
key = Signature.NONEwithECDSAinP1363Format
value = sun.security.ec.ECDSASignature$RawinP1363Format
===================
key = KeyPairGenerator.EC SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = KeyFactory.Ed25519 ImplementedIn
value = Software
===================
key = KeyFactory.X448 ImplementedIn
value = Software
===================
key = Signature.SHA3-256withECDSA ImplementedIn
value = Software
===================
key = Signature.SHA224withECDSAinP1363Format
value = sun.security.ec.ECDSASignature$SHA224inP1363Format
===================
key = AlgorithmParameters.EC SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = KeyFactory.X25519
value = sun.security.ec.XDHKeyFactory.X25519
===================
key = Signature.SHA3-512withECDSAinP1363Format
value = sun.security.ec.ECDSASignature$SHA3_512inP1363Format
===================
key = KeyAgreement.X448 ImplementedIn
value = Software
===================
key = Signature.NONEwithECDSA
value = sun.security.ec.ECDSASignature$Raw
===================
key = Signature.SHA3-224withECDSA SupportedKeyClasses
value = java.security.interfaces.ECPublicKey|java.security.interfaces.ECPrivateKey
===================
key = AlgorithmParameters.EC ImplementedIn
value = Software
===================
key = AlgorithmParameters.EC SupportedCurves
value = [secp256r1,NIST P-256,X9.62 prime256v1,1.2.840.10045.3.1.7]|[secp384r1,NIST P-384,1.3.132.0.34]|[secp521r1,NIST P-521,1.3.132.0.35]
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.3.2
value = SHA256withECDSA
===================
key = Signature.SHA1withECDSA
value = sun.security.ec.ECDSASignature$SHA1
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.3.3
value = SHA384withECDSA
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.3.4
value = SHA512withECDSA
===================
key = Alg.Alias.KeyPairGenerator.1.3.101.112
value = Ed25519
===================
key = Signature.SHA224withECDSA
value = sun.security.ec.ECDSASignature$SHA224
===================
key = Alg.Alias.KeyPairGenerator.1.3.101.113
value = Ed448
===================
key = Alg.Alias.KeyPairGenerator.1.3.101.110
value = X25519
===================
key = Alg.Alias.KeyPairGenerator.1.3.101.111
value = X448
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.3.1
value = SHA224withECDSA
===================
key = KeyPairGenerator.X25519 ImplementedIn
value = Software
===================
key = Alg.Alias.Signature.1.2.840.10045.4.1
value = SHA1withECDSA
===================
key = Alg.Alias.KeyPairGenerator.1.2.840.10045.2.1
value = EC
===================
key = KeyAgreement.ECDH
value = sun.security.ec.ECDHKeyAgreement
===================
key = KeyFactory.EC ImplementedIn
value = Software
===================
key = KeyPairGenerator.Ed448
value = sun.security.ec.ed.EdDSAKeyPairGenerator.Ed448
===================
key = Alg.Alias.KeyAgreement.1.3.101.111
value = X448
===================
key = Signature.SHA3-224withECDSA KeySize
value = 256
===================
key = Alg.Alias.KeyAgreement.1.3.101.110
value = X25519
提供者类class sun.security.ssl.SunJSSE
===================
key = KeyManagerFactory.NewSunX509
value = sun.security.ssl.KeyManagerFactoryImpl$X509
===================
key = Alg.Alias.TrustManagerFactory.X.509
value = PKIX
===================
key = Alg.Alias.SSLContext.SSLv3
value = TLSv1
===================
key = Alg.Alias.SSLContext.SSL
value = TLS
===================
key = Provider.id version
value = 20
===================
key = SSLContext.DTLS
value = sun.security.ssl.SSLContextImpl$DTLSContext
===================
key = SSLContext.TLS
value = sun.security.ssl.SSLContextImpl$TLSContext
===================
key = Provider.id info
value = Sun JSSE provider(PKCS12, SunX509/PKIX key/trust factories, SSLv3/TLSv1/TLSv1.1/TLSv1.2/TLSv1.3/DTLSv1.0/DTLSv1.2)
===================
key = Alg.Alias.TrustManagerFactory.SunPKIX
value = PKIX
===================
key = SSLContext.TLSv1
value = sun.security.ssl.SSLContextImpl$TLS10Context
===================
key = Provider.id className
value = sun.security.ssl.SunJSSE
===================
key = Signature.MD5andSHA1withRSA
value = sun.security.ssl.RSASignature
===================
key = SSLContext.DTLSv1.0
value = sun.security.ssl.SSLContextImpl$DTLS10Context
===================
key = TrustManagerFactory.PKIX
value = sun.security.ssl.TrustManagerFactoryImpl$PKIXFactory
===================
key = SSLContext.TLSv1.3
value = sun.security.ssl.SSLContextImpl$TLS13Context
===================
key = KeyStore.PKCS12
value = sun.security.pkcs12.PKCS12KeyStore
===================
key = SSLContext.DTLSv1.2
value = sun.security.ssl.SSLContextImpl$DTLS12Context
===================
key = KeyManagerFactory.SunX509
value = sun.security.ssl.KeyManagerFactoryImpl$SunX509
===================
key = SSLContext.Default
value = sun.security.ssl.SSLContextImpl$DefaultSSLContext
===================
key = Alg.Alias.TrustManagerFactory.X509
value = PKIX
===================
key = Provider.id name
value = SunJSSE
===================
key = TrustManagerFactory.SunX509
value = sun.security.ssl.TrustManagerFactoryImpl$SimpleFactory
===================
key = Alg.Alias.KeyManagerFactory.PKIX
value = NewSunX509
===================
key = SSLContext.TLSv1.2
value = sun.security.ssl.SSLContextImpl$TLS12Context
===================
key = SSLContext.TLSv1.1
value = sun.security.ssl.SSLContextImpl$TLS11Context
提供者类class com.sun.crypto.provider.SunJCE
===================
key = SecretKeyFactory.PBEWithHmacSHA1AndAES_256
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA1AndAES_256
===================
key = KeyStore.JCEKS
value = com.sun.crypto.provider.JceKeyStore
===================
key = Cipher.AES_128/CBC/NoPadding SupportedKeyFormats
value = RAW
===================
key = Cipher.PBEWithMD5AndTripleDES
value = com.sun.crypto.provider.PBEWithMD5AndTripleDESCipher
===================
key = Cipher.PBEWithSHA1AndRC4_128
value = com.sun.crypto.provider.PKCS12PBECipherCore$PBEWithSHA1AndRC4_128
===================
key = Mac.HmacSHA512/224
value = com.sun.crypto.provider.HmacCore$HmacSHA512_224
===================
key = Mac.HmacPBESHA512/256
value = com.sun.crypto.provider.HmacPKCS12PBECore$HmacPKCS12PBE_SHA512_256
===================
key = Cipher.AES_256/GCM/NoPadding SupportedModes
value = GCM
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.5.13
value = PBES2
===================
key = Cipher.AES/KW/NoPadding SupportedKeyFormats
value = RAW
===================
key = Cipher.AES_192/ECB/NoPadding SupportedKeyFormats
value = RAW
===================
key = SecretKeyFactory.PBEWithHmacSHA1AndAES_128
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA1AndAES_128
===================
key = Alg.Alias.AlgorithmParameters.TripleDES
value = DESede
===================
key = Alg.Alias.AlgorithmParameters.2.16.840.1.101.3.4.1
value = AES
===================
key = Mac.HmacSHA512 SupportedKeyFormats
value = RAW
===================
key = Cipher.PBEWithSHA1AndRC2_40
value = com.sun.crypto.provider.PKCS12PBECipherCore$PBEWithSHA1AndRC2_40
===================
key = Alg.Alias.KeyGenerator.1.2.840.113549.3.4
value = ARCFOUR
===================
key = Alg.Alias.Mac.1.2.840.113549.2.13
value = HmacSHA512/256
===================
key = Alg.Alias.Mac.1.2.840.113549.2.12
value = HmacSHA512/224
===================
key = Alg.Alias.Mac.1.2.840.113549.2.11
value = HmacSHA512
===================
key = Alg.Alias.Mac.1.2.840.113549.2.10
value = HmacSHA384
===================
key = Mac.HmacSHA256
value = com.sun.crypto.provider.HmacCore$HmacSHA256
===================
key = Mac.HmacSHA3-224
value = com.sun.crypto.provider.HmacCore$HmacSHA3_224
===================
key = AlgorithmParameters.AES
value = com.sun.crypto.provider.AESParameters
===================
key = Cipher.AES_256/CBC/NoPadding
value = com.sun.crypto.provider.AESCipher$AES256_CBC_NoPadding
===================
key = Alg.Alias.Cipher.AESWrapPad_256
value = AES_256/KWP/NoPadding
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = Mac.PBEWithHmacSHA384
value = com.sun.crypto.provider.PBMAC1Core$HmacSHA384
===================
key = SecretKeyFactory.PBKDF2WithHmacSHA256
value = com.sun.crypto.provider.PBKDF2Core$HmacSHA256
===================
key = Cipher.AES/KW/PKCS5Padding SupportedKeyFormats
value = RAW
===================
key = Cipher.AES_128/KW/NoPadding SupportedKeyFormats
value = RAW
===================
key = Mac.HmacSHA384
value = com.sun.crypto.provider.HmacCore$HmacSHA384
===================
key = SecretKeyFactory.DES
value = com.sun.crypto.provider.DESKeyFactory
===================
key = Alg.Alias.Cipher.AESWrapPad
value = AES/KWP/NoPadding
===================
key = Alg.Alias.Cipher.PBE
value = PBEWithMD5AndDES
===================
key = SecretKeyFactory.PBEWithHmacSHA256AndAES_128
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA256AndAES_128
===================
key = Alg.Alias.Cipher.AESWrapPad_128
value = AES_128/KWP/NoPadding
===================
key = Mac.HmacPBESHA384 SupportedKeyFormats
value = RAW
===================
key = Cipher.AES/KWP/NoPadding
value = com.sun.crypto.provider.KeyWrapCipher$AES_KWP_NoPadding
===================
key = Mac.HmacPBESHA512/256 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyGenerator.1.2.840.113549.2.12
value = HmacSHA512/224
===================
key = Alg.Alias.KeyGenerator.1.2.840.113549.2.11
value = HmacSHA512
===================
key = SecretKeyFactory.PBKDF2WithHmacSHA384
value = com.sun.crypto.provider.PBKDF2Core$HmacSHA384
===================
key = Mac.HmacPBESHA512
value = com.sun.crypto.provider.HmacPKCS12PBECore$HmacPKCS12PBE_SHA512
===================
key = Alg.Alias.KeyGenerator.1.2.840.113549.2.10
value = HmacSHA384
===================
key = Cipher.AES
value = com.sun.crypto.provider.AESCipher$General
===================
key = Mac.HmacPBESHA512/224
value = com.sun.crypto.provider.HmacPKCS12PBECore$HmacPKCS12PBE_SHA512_224
===================
key = Alg.Alias.KeyGenerator.1.2.840.113549.2.13
value = HmacSHA512/256
===================
key = Mac.PBEWithHmacSHA256
value = com.sun.crypto.provider.PBMAC1Core$HmacSHA256
===================
key = KeyGenerator.SunTls12Prf
value = com.sun.crypto.provider.TlsPrfGenerator$V12
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.3
value = AES_128/OFB/NoPadding
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.4
value = AES_128/CFB/NoPadding
===================
key = Cipher.DESede SupportedModes
value = ECB|CBC|PCBC|CTR|CTS|CFB|OFB|CFB8|CFB16|CFB24|CFB32|CFB40|CFB48|CFB56|CFB64|OFB8|OFB16|OFB24|OFB32|OFB40|OFB48|OFB56|OFB64
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.5
value = AES_128/KW/NoPadding
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.6
value = AES_128/GCM/NoPadding
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.1
value = AES_128/ECB/NoPadding
===================
key = Cipher.ARCFOUR SupportedModes
value = ECB
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.2
value = AES_128/CBC/NoPadding
===================
key = Cipher.DESedeWrap SupportedModes
value = CBC
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.8
value = AES_128/KWP/NoPadding
===================
key = SecretKeyFactory.PBEWithHmacSHA256AndAES_256
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA256AndAES_256
===================
key = Cipher.PBEWithHmacSHA384AndAES_128
value = com.sun.crypto.provider.PBES2Core$HmacSHA384AndAES_128
===================
key = Alg.Alias.Cipher.AESWrapPad_192
value = AES_192/KWP/NoPadding
===================
key = Mac.HmacSHA384 SupportedKeyFormats
value = RAW
===================
key = Mac.HmacPBESHA512 SupportedKeyFormats
value = RAW
===================
key = Cipher.AES/GCM/NoPadding
value = com.sun.crypto.provider.GaloisCounterMode$AESGCM
===================
key = Cipher.AES/GCM/NoPadding SupportedModes
value = GCM
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.1.7
value = OAEP
===================
key = Alg.Alias.KeyAgreement.DH
value = DiffieHellman
===================
key = Cipher.AES_192/KW/NoPadding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.1.7
value = OAEP
===================
key = SecretKeyFactory.PBEWithSHA1AndDESede
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithSHA1AndDESede
===================
key = Mac.HmacPBESHA1
value = com.sun.crypto.provider.HmacPKCS12PBECore$HmacPKCS12PBE_SHA1
===================
key = Alg.Alias.KeyGenerator.SunTls12MasterSecret
value = SunTlsMasterSecret
===================
key = AlgorithmParameters.RC2
value = com.sun.crypto.provider.RC2Parameters
===================
key = Alg.Alias.AlgorithmParameters.PBE
value = PBEWithMD5AndDES
===================
key = Cipher.AES_256/ECB/NoPadding
value = com.sun.crypto.provider.AESCipher$AES256_ECB_NoPadding
===================
key = AlgorithmParameters.OAEP
value = com.sun.crypto.provider.OAEPParameters
===================
key = Alg.Alias.KeyGenerator.OID.1.2.840.113549.2.10
value = HmacSHA384
===================
key = Mac.HmacSHA3-512 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyGenerator.OID.1.2.840.113549.2.11
value = HmacSHA512
===================
key = KeyGenerator.HmacSHA512/224
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA512_224
===================
key = Alg.Alias.KeyGenerator.OID.1.2.840.113549.2.12
value = HmacSHA512/224
===================
key = Alg.Alias.KeyGenerator.OID.1.2.840.113549.2.13
value = HmacSHA512/256
===================
key = AlgorithmParameters.PBEWithSHA1AndRC4_128
value = com.sun.crypto.provider.PBEParameters
===================
key = Cipher.AES_256/KWP/NoPadding
value = com.sun.crypto.provider.KeyWrapCipher$AES256_KWP_NoPadding
===================
key = Cipher.AES_128/KW/PKCS5Padding
value = com.sun.crypto.provider.KeyWrapCipher$AES128_KW_PKCS5Padding
===================
key = KeyGenerator.HmacSHA512/256
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA512_256
===================
key = Cipher.DESede SupportedPaddings
value = NOPADDING|PKCS5PADDING|ISO10126PADDING
===================
key = KeyGenerator.SunTlsPrf
value = com.sun.crypto.provider.TlsPrfGenerator$V10
===================
key = Cipher.RSA SupportedKeyClasses
value = java.security.interfaces.RSAPublicKey|java.security.interfaces.RSAPrivateKey
===================
key = Mac.PBEWithHmacSHA224
value = com.sun.crypto.provider.PBMAC1Core$HmacSHA224
===================
key = Mac.HmacSHA512/224 SupportedKeyFormats
value = RAW
===================
key = Cipher.AES_128/CFB/NoPadding
value = com.sun.crypto.provider.AESCipher$AES128_CFB_NoPadding
===================
key = Alg.Alias.AlgorithmParameters.DH
value = DiffieHellman
===================
key = KeyGenerator.HmacSHA384
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA384
===================
key = Cipher.AES_256/GCM/NoPadding
value = com.sun.crypto.provider.GaloisCounterMode$AES256
===================
key = Alg.Alias.KeyGenerator.2.16.840.1.101.3.4.2.16
value = HmacSHA3-512
===================
key = Alg.Alias.KeyGenerator.2.16.840.1.101.3.4.2.15
value = HmacSHA3-384
===================
key = Alg.Alias.KeyGenerator.2.16.840.1.101.3.4.2.14
value = HmacSHA3-256
===================
key = Alg.Alias.KeyGenerator.2.16.840.1.101.3.4.2.13
value = HmacSHA3-224
===================
key = Alg.Alias.Cipher.1.2.840.113549.1.5.3
value = PBEWithMD5AndDES
===================
key = Alg.Alias.SecretKeyFactory.OID.1.2.840.113549.1.12.1.5
value = PBEWithSHA1AndRC2_128
===================
key = AlgorithmParameters.PBEWithHmacSHA256AndAES_256
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA256AndAES_256
===================
key = Alg.Alias.SecretKeyFactory.OID.1.2.840.113549.1.12.1.6
value = PBEWithSHA1AndRC2_40
===================
key = SecretKeyFactory.PBEWithSHA1AndRC2_128
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithSHA1AndRC2_128
===================
key = Alg.Alias.SecretKeyFactory.OID.1.2.840.113549.1.12.1.1
value = PBEWithSHA1AndRC4_128
===================
key = Mac.HmacSHA512/256
value = com.sun.crypto.provider.HmacCore$HmacSHA512_256
===================
key = Alg.Alias.SecretKeyFactory.OID.1.2.840.113549.1.12.1.2
value = PBEWithSHA1AndRC4_40
===================
key = Alg.Alias.SecretKeyFactory.OID.1.2.840.113549.1.12.1.3
value = PBEWithSHA1AndDESede
===================
key = AlgorithmParameters.PBEWithMD5AndTripleDES
value = com.sun.crypto.provider.PBEParameters
===================
key = AlgorithmParameters.PBEWithHmacSHA256AndAES_128
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA256AndAES_128
===================
key = Alg.Alias.KeyGenerator.1.2.840.113549.2.8
value = HmacSHA224
===================
key = Cipher.AES_192/OFB/NoPadding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyGenerator.1.2.840.113549.2.9
value = HmacSHA256
===================
key = AlgorithmParameters.DES
value = com.sun.crypto.provider.DESParameters
===================
key = Alg.Alias.KeyGenerator.1.2.840.113549.2.7
value = HmacSHA1
===================
key = Cipher.AES_256/KW/NoPadding
value = com.sun.crypto.provider.KeyWrapCipher$AES256_KW_NoPadding
===================
key = SecretKeyFactory.DESede
value = com.sun.crypto.provider.DESedeKeyFactory
===================
key = Cipher.PBEWithHmacSHA512AndAES_128
value = com.sun.crypto.provider.PBES2Core$HmacSHA512AndAES_128
===================
key = Alg.Alias.KeyPairGenerator.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = SecretKeyFactory.PBEWithSHA1AndRC4_128
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithSHA1AndRC4_128
===================
key = Cipher.AES_128/KW/NoPadding
value = com.sun.crypto.provider.KeyWrapCipher$AES128_KW_NoPadding
===================
key = Cipher.DESedeWrap SupportedKeyFormats
value = RAW
===================
key = Cipher.PBEWithHmacSHA512AndAES_256
value = com.sun.crypto.provider.PBES2Core$HmacSHA512AndAES_256
===================
key = Mac.HmacPBESHA256
value = com.sun.crypto.provider.HmacPKCS12PBECore$HmacPKCS12PBE_SHA256
===================
key = Mac.PBEWithHmacSHA224 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.AlgorithmParameterGenerator.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = Alg.Alias.Cipher.1.2.840.113549.3.4
value = ARCFOUR
===================
key = Cipher.AES SupportedPaddings
value = NOPADDING|PKCS5PADDING|ISO10126PADDING
===================
key = KeyGenerator.SunTlsMasterSecret
value = com.sun.crypto.provider.TlsMasterSecretGenerator
===================
key = Alg.Alias.Cipher.1.2.840.113549.1.9.16.3.18
value = ChaCha20-Poly1305
===================
key = Mac.PBEWithHmacSHA256 SupportedKeyFormats
value = RAW
===================
key = Mac.HmacPBESHA224
value = com.sun.crypto.provider.HmacPKCS12PBECore$HmacPKCS12PBE_SHA224
===================
key = Cipher.AES_128/OFB/NoPadding
value = com.sun.crypto.provider.AESCipher$AES128_OFB_NoPadding
===================
key = Alg.Alias.SecretKeyFactory.TripleDES
value = DESede
===================
key = Mac.HmacSHA512/256 SupportedKeyFormats
value = RAW
===================
key = KeyGenerator.DESede
value = com.sun.crypto.provider.DESedeKeyGenerator
===================
key = Cipher.PBEWithHmacSHA256AndAES_256
value = com.sun.crypto.provider.PBES2Core$HmacSHA256AndAES_256
===================
key = KeyGenerator.HmacSHA3-384
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA3_384
===================
key = Mac.HmacSHA3-512
value = com.sun.crypto.provider.HmacCore$HmacSHA3_512
===================
key = Cipher.PBEWithMD5AndDES
value = com.sun.crypto.provider.PBEWithMD5AndDESCipher
===================
key = Cipher.AES_128/ECB/NoPadding SupportedKeyFormats
value = RAW
===================
key = AlgorithmParameters.DESede
value = com.sun.crypto.provider.DESedeParameters
===================
key = Mac.HmacPBESHA1 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.5.13
value = PBES2
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.4
value = AES_128/CFB/NoPadding
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.3
value = AES_128/OFB/NoPadding
===================
key = Cipher.AES_256/KW/PKCS5Padding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.6
value = AES_128/GCM/NoPadding
===================
key = AlgorithmParameterGenerator.DiffieHellman
value = com.sun.crypto.provider.DHParameterGenerator
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.5
value = AES_128/KW/NoPadding
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.8
value = AES_128/KWP/NoPadding
===================
key = Provider.id name
value = SunJCE
===================
key = Cipher.PBEWithSHA1AndRC4_40
value = com.sun.crypto.provider.PKCS12PBECipherCore$PBEWithSHA1AndRC4_40
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.2
value = AES_128/CBC/NoPadding
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.1
value = AES_128/ECB/NoPadding
===================
key = KeyAgreement.DiffieHellman SupportedKeyClasses
value = javax.crypto.interfaces.DHPublicKey|javax.crypto.interfaces.DHPrivateKey
===================
key = KeyGenerator.SunTlsKeyMaterial
value = com.sun.crypto.provider.TlsKeyMaterialGenerator
===================
key = Cipher.AES_256/ECB/NoPadding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyAgreement.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = Mac.HmacSHA3-384 SupportedKeyFormats
value = RAW
===================
key = Cipher.PBEWithHmacSHA256AndAES_128
value = com.sun.crypto.provider.PBES2Core$HmacSHA256AndAES_128
===================
key = KeyGenerator.HmacSHA3-256
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA3_256
===================
key = Cipher.AES_192/KW/NoPadding
value = com.sun.crypto.provider.KeyWrapCipher$AES192_KW_NoPadding
===================
key = Alg.Alias.Cipher.AESWrap
value = AES/KW/NoPadding
===================
key = Alg.Alias.KeyGenerator.RC4
value = ARCFOUR
===================
key = KeyGenerator.HmacSHA1
value = com.sun.crypto.provider.HmacSHA1KeyGenerator
===================
key = Alg.Alias.Cipher.OID.1.2.840.113549.3.4
value = ARCFOUR
===================
key = Cipher.AES_256/KWP/NoPadding SupportedKeyFormats
value = RAW
===================
key = Mac.HmacPBESHA512/224 SupportedKeyFormats
value = RAW
===================
key = Cipher.AES_192/KWP/NoPadding
value = com.sun.crypto.provider.KeyWrapCipher$AES192_KWP_NoPadding
===================
key = AlgorithmParameters.PBEWithHmacSHA1AndAES_256
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA1AndAES_256
===================
key = Mac.HmacSHA1 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyGenerator.OID.1.2.840.113549.3.4
value = ARCFOUR
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1
value = AES
===================
key = Cipher.RSA SupportedModes
value = ECB
===================
key = AlgorithmParameters.PBEWithHmacSHA1AndAES_128
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA1AndAES_128
===================
key = Mac.SslMacSHA1
value = com.sun.crypto.provider.SslMacCore$SslMacSHA1
===================
key = Cipher.AES_128/CFB/NoPadding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Cipher.AESWrap_128
value = AES_128/KW/NoPadding
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.5.3
value = PBEWithMD5AndDES
===================
key = KeyPairGenerator.DiffieHellman
value = com.sun.crypto.provider.DHKeyPairGenerator
===================
key = Cipher.AES SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyGenerator.SunTls12KeyMaterial
value = SunTlsKeyMaterial
===================
key = Mac.SslMacMD5 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyPairGenerator.OID.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = AlgorithmParameters.PBEWithSHA1AndDESede
value = com.sun.crypto.provider.PBEParameters
===================
key = Alg.Alias.Cipher.RC4
value = ARCFOUR
===================
key = Alg.Alias.KeyGenerator.OID.1.2.840.113549.2.7
value = HmacSHA1
===================
key = Mac.HmacSHA224
value = com.sun.crypto.provider.HmacCore$HmacSHA224
===================
key = Alg.Alias.KeyGenerator.OID.1.2.840.113549.2.8
value = HmacSHA224
===================
key = Alg.Alias.KeyGenerator.OID.1.2.840.113549.2.9
value = HmacSHA256
===================
key = Cipher.AES_256/CFB/NoPadding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.42
value = AES_256/CBC/NoPadding
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.41
value = AES_256/ECB/NoPadding
===================
key = Alg.Alias.KeyGenerator.OID.2.16.840.1.101.3.4.2.13
value = HmacSHA3-224
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.44
value = AES_256/CFB/NoPadding
===================
key = Alg.Alias.KeyGenerator.OID.2.16.840.1.101.3.4.2.14
value = HmacSHA3-256
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.43
value = AES_256/OFB/NoPadding
===================
key = Alg.Alias.KeyGenerator.OID.2.16.840.1.101.3.4.2.15
value = HmacSHA3-384
===================
key = Cipher.DESedeWrap SupportedPaddings
value = NOPADDING
===================
key = KeyGenerator.Blowfish
value = com.sun.crypto.provider.BlowfishKeyGenerator
===================
key = Cipher.RSA
value = com.sun.crypto.provider.RSACipher
===================
key = Cipher.AES_128/GCM/NoPadding
value = com.sun.crypto.provider.GaloisCounterMode$AES128
===================
key = Cipher.AES_128/GCM/NoPadding SupportedKeyFormats
value = RAW
===================
key = Cipher.ChaCha20 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyGenerator.OID.2.16.840.1.101.3.4.2.16
value = HmacSHA3-512
===================
key = Cipher.AES_256/CFB/NoPadding
value = com.sun.crypto.provider.AESCipher$AES256_CFB_NoPadding
===================
key = Cipher.ChaCha20-Poly1305 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.46
value = AES_256/GCM/NoPadding
===================
key = Cipher.AES_256/GCM/NoPadding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.45
value = AES_256/KW/NoPadding
===================
key = Cipher.AES_256/OFB/NoPadding
value = com.sun.crypto.provider.AESCipher$AES256_OFB_NoPadding
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.48
value = AES_256/KWP/NoPadding
===================
key = Alg.Alias.AlgorithmParameterGenerator.OID.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = Cipher.AES_192/ECB/NoPadding
value = com.sun.crypto.provider.AESCipher$AES192_ECB_NoPadding
===================
key = Cipher.AES_192/GCM/NoPadding SupportedModes
value = GCM
===================
key = Alg.Alias.KeyGenerator.OID.2.16.840.1.101.3.4.1
value = AES
===================
key = SecretKeyFactory.PBEWithHmacSHA512AndAES_128
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA512AndAES_128
===================
key = AlgorithmParameters.DiffieHellman
value = com.sun.crypto.provider.DHParameters
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.9.16.3.18
value = ChaCha20-Poly1305
===================
key = Alg.Alias.Cipher.OID.1.2.840.113549.1.12.1.6
value = PBEWithSHA1AndRC2_40
===================
key = Cipher.PBEWithHmacSHA1AndAES_128
value = com.sun.crypto.provider.PBES2Core$HmacSHA1AndAES_128
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.22
value = AES_192/CBC/NoPadding
===================
key = Cipher.ARCFOUR
value = com.sun.crypto.provider.ARCFOURCipher
===================
key = Alg.Alias.Cipher.OID.1.2.840.113549.1.12.1.5
value = PBEWithSHA1AndRC2_128
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.21
value = AES_192/ECB/NoPadding
===================
key = Alg.Alias.Cipher.OID.1.2.840.113549.1.12.1.3
value = PBEWithSHA1AndDESede
===================
key = Alg.Alias.SecretKeyFactory.OID.1.2.840.113549.1.5.12
value = PBKDF2WithHmacSHA1
===================
key = Alg.Alias.Cipher.OID.1.2.840.113549.1.12.1.2
value = PBEWithSHA1AndRC4_40
===================
key = Alg.Alias.Cipher.OID.1.2.840.113549.1.12.1.1
value = PBEWithSHA1AndRC4_128
===================
key = AlgorithmParameters.PBEWithSHA1AndRC2_40
value = com.sun.crypto.provider.PBEParameters
===================
key = KeyGenerator.HmacMD5
value = com.sun.crypto.provider.HmacMD5KeyGenerator
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.28
value = AES_192/KWP/NoPadding
===================
key = Cipher.AES_128/KWP/NoPadding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.24
value = AES_192/CFB/NoPadding
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.23
value = AES_192/OFB/NoPadding
===================
key = SecretKeyFactory.PBEWithHmacSHA512AndAES_256
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA512AndAES_256
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.26
value = AES_192/GCM/NoPadding
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1.25
value = AES_192/KW/NoPadding
===================
key = Cipher.AES_192/KW/PKCS5Padding SupportedKeyFormats
value = RAW
===================
key = KeyGenerator.RC2
value = com.sun.crypto.provider.KeyGeneratorCore$RC2KeyGenerator
===================
key = Provider.id version
value = 20
===================
key = Alg.Alias.Cipher.AESWrap_256
value = AES_256/KW/NoPadding
===================
key = Cipher.DES SupportedKeyFormats
value = RAW
===================
key = Mac.HmacPBESHA256 SupportedKeyFormats
value = RAW
===================
key = Cipher.AES_128/KW/PKCS5Padding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyPairGenerator.DH
value = DiffieHellman
===================
key = Provider.id className
value = com.sun.crypto.provider.SunJCE
===================
key = Cipher.AES_128/KWP/NoPadding
value = com.sun.crypto.provider.KeyWrapCipher$AES128_KWP_NoPadding
===================
key = AlgorithmParameters.PBES2
value = com.sun.crypto.provider.PBES2Parameters$General
===================
key = Cipher.RC2 SupportedPaddings
value = NOPADDING|PKCS5PADDING|ISO10126PADDING
===================
key = Alg.Alias.SecretKeyFactory.OID.1.2.840.113549.1.5.3
value = PBEWithMD5AndDES
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.12.1.1
value = PBEWithSHA1AndRC4_128
===================
key = Mac.HmacMD5 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyFactory.DH
value = DiffieHellman
===================
key = Alg.Alias.Cipher.2.16.840.1.101.3.4.1
value = AES
===================
key = Cipher.AES_192/GCM/NoPadding
value = com.sun.crypto.provider.GaloisCounterMode$AES192
===================
key = KeyGenerator.HmacSHA512
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA512
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.12.1.6
value = PBEWithSHA1AndRC2_40
===================
key = Alg.Alias.KeyGenerator.2.16.840.1.101.3.4.1
value = AES
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.12.1.2
value = PBEWithSHA1AndRC4_40
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.12.1.3
value = PBEWithSHA1AndDESede
===================
key = Cipher.AES_128/CBC/NoPadding
value = com.sun.crypto.provider.AESCipher$AES128_CBC_NoPadding
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.12.1.5
value = PBEWithSHA1AndRC2_128
===================
key = SecretKeyFactory.PBEWithSHA1AndRC2_40
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithSHA1AndRC2_40
===================
key = AlgorithmParameters.PBEWithHmacSHA512AndAES_256
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA512AndAES_256
===================
key = Cipher.AES_192/KWP/NoPadding SupportedKeyFormats
value = RAW
===================
key = SecretKeyFactory.PBEWithHmacSHA384AndAES_128
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA384AndAES_128
===================
key = AlgorithmParameters.PBEWithMD5AndDES
value = com.sun.crypto.provider.PBEParameters
===================
key = Cipher.RC2 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Cipher.AESWrap_192
value = AES_192/KW/NoPadding
===================
key = Alg.Alias.Cipher.1.2.840.113549.1.12.1.3
value = PBEWithSHA1AndDESede
===================
key = Alg.Alias.Cipher.1.2.840.113549.1.12.1.2
value = PBEWithSHA1AndRC4_40
===================
key = Alg.Alias.Cipher.1.2.840.113549.1.12.1.1
value = PBEWithSHA1AndRC4_128
===================
key = SecretKeyFactory.PBEWithHmacSHA384AndAES_256
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA384AndAES_256
===================
key = Cipher.AES_256/CBC/NoPadding SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Cipher.1.2.840.113549.1.12.1.6
value = PBEWithSHA1AndRC2_40
===================
key = Alg.Alias.Cipher.1.2.840.113549.1.12.1.5
value = PBEWithSHA1AndRC2_128
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.12.1.6
value = PBEWithSHA1AndRC2_40
===================
key = AlgorithmParameters.PBEWithHmacSHA512AndAES_128
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA512AndAES_128
===================
key = AlgorithmParameters.PBEWithSHA1AndRC4_40
value = com.sun.crypto.provider.PBEParameters
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.12.1.1
value = PBEWithSHA1AndRC4_128
===================
key = AlgorithmParameters.ChaCha20-Poly1305
value = com.sun.crypto.provider.ChaCha20Poly1305Parameters
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.12.1.3
value = PBEWithSHA1AndDESede
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.12.1.2
value = PBEWithSHA1AndRC4_40
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.12.1.5
value = PBEWithSHA1AndRC2_128
===================
key = Cipher.DESede SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Mac.1.2.840.113549.2.8
value = HmacSHA224
===================
key = Alg.Alias.Mac.1.2.840.113549.2.7
value = HmacSHA1
===================
key = Alg.Alias.KeyAgreement.OID.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = Mac.PBEWithHmacSHA1 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.KeyFactory.OID.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = Alg.Alias.Mac.1.2.840.113549.2.9
value = HmacSHA256
===================
key = Cipher.DES SupportedModes
value = ECB|CBC|PCBC|CTR|CTS|CFB|OFB|CFB8|CFB16|CFB24|CFB32|CFB40|CFB48|CFB56|CFB64|OFB8|OFB16|OFB24|OFB32|OFB40|OFB48|OFB56|OFB64
===================
key = Cipher.AES SupportedModes
value = ECB|CBC|PCBC|CTR|CTS|CFB|OFB|CFB8|CFB16|CFB24|CFB32|CFB40|CFB48|CFB56|CFB64|OFB8|OFB16|OFB24|OFB32|OFB40|OFB48|OFB56|OFB64|CFB72|CFB80|CFB88|CFB96|CFB104|CFB112|CFB120|CFB128|OFB72|OFB80|OFB88|OFB96|OFB104|OFB112|OFB120|OFB128
===================
key = KeyGenerator.ChaCha20
value = com.sun.crypto.provider.KeyGeneratorCore$ChaCha20KeyGenerator
===================
key = Mac.HmacPBESHA384
value = com.sun.crypto.provider.HmacPKCS12PBECore$HmacPKCS12PBE_SHA384
===================
key = Cipher.ChaCha20-Poly1305
value = com.sun.crypto.provider.ChaCha20Cipher$ChaCha20Poly1305
===================
key = Alg.Alias.KeyFactory.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = Mac.PBEWithHmacSHA384 SupportedKeyFormats
value = RAW
===================
key = KeyAgreement.DiffieHellman
value = com.sun.crypto.provider.DHKeyAgreement
===================
key = Cipher.PBEWithSHA1AndDESede
value = com.sun.crypto.provider.PKCS12PBECipherCore$PBEWithSHA1AndDESede
===================
key = Cipher.AES_192/GCM/NoPadding SupportedKeyFormats
value = RAW
===================
key = Cipher.AES_256/KW/PKCS5Padding
value = com.sun.crypto.provider.KeyWrapCipher$AES256_KW_PKCS5Padding
===================
key = KeyGenerator.SunTlsRsaPremasterSecret
value = com.sun.crypto.provider.TlsRsaPremasterSecretGenerator
===================
key = Cipher.AES_192/CFB/NoPadding SupportedKeyFormats
value = RAW
===================
key = KeyGenerator.HmacSHA3-224
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA3_224
===================
key = Cipher.ARCFOUR SupportedPaddings
value = NOPADDING
===================
key = Cipher.ChaCha20
value = com.sun.crypto.provider.ChaCha20Cipher$ChaCha20Only
===================
key = Alg.Alias.KeyGenerator.TripleDES
value = DESede
===================
key = Alg.Alias.KeyGenerator.SunTls12RsaPremasterSecret
value = SunTlsRsaPremasterSecret
===================
key = Mac.PBEWithHmacSHA1
value = com.sun.crypto.provider.PBMAC1Core$HmacSHA1
===================
key = Alg.Alias.Mac.2.16.840.1.101.3.4.2.13
value = HmacSHA3-224
===================
key = Cipher.PBEWithSHA1AndRC2_128
value = com.sun.crypto.provider.PKCS12PBECipherCore$PBEWithSHA1AndRC2_128
===================
key = Alg.Alias.Mac.2.16.840.1.101.3.4.2.14
value = HmacSHA3-256
===================
key = Alg.Alias.Mac.2.16.840.1.101.3.4.2.15
value = HmacSHA3-384
===================
key = Alg.Alias.Mac.2.16.840.1.101.3.4.2.16
value = HmacSHA3-512
===================
key = KeyGenerator.DES
value = com.sun.crypto.provider.DESKeyGenerator
===================
key = Cipher.AES/KW/NoPadding
value = com.sun.crypto.provider.KeyWrapCipher$AES_KW_NoPadding
===================
key = Cipher.PBEWithHmacSHA1AndAES_256
value = com.sun.crypto.provider.PBES2Core$HmacSHA1AndAES_256
===================
key = Cipher.DESedeWrap
value = com.sun.crypto.provider.DESedeWrapCipher
===================
key = Cipher.Blowfish SupportedPaddings
value = NOPADDING|PKCS5PADDING|ISO10126PADDING
===================
key = KeyGenerator.ARCFOUR
value = com.sun.crypto.provider.KeyGeneratorCore$ARCFOURKeyGenerator
===================
key = Mac.HmacSHA512
value = com.sun.crypto.provider.HmacCore$HmacSHA512
===================
key = Alg.Alias.KeyGenerator.SunTlsExtendedMasterSecret
value = SunTlsMasterSecret
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.3.1
value = DiffieHellman
===================
key = SecretKeyFactory.PBEWithMD5AndTripleDES
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithMD5AndTripleDES
===================
key = Alg.Alias.Mac.OID.2.16.840.1.101.3.4.2.15
value = HmacSHA3-384
===================
key = Alg.Alias.Mac.OID.2.16.840.1.101.3.4.2.16
value = HmacSHA3-512
===================
key = Alg.Alias.Mac.OID.2.16.840.1.101.3.4.2.13
value = HmacSHA3-224
===================
key = Alg.Alias.Mac.OID.2.16.840.1.101.3.4.2.14
value = HmacSHA3-256
===================
key = Cipher.Blowfish SupportedModes
value = ECB|CBC|PCBC|CTR|CTS|CFB|OFB|CFB8|CFB16|CFB24|CFB32|CFB40|CFB48|CFB56|CFB64|OFB8|OFB16|OFB24|OFB32|OFB40|OFB48|OFB56|OFB64
===================
key = Alg.Alias.Cipher.OID.1.2.840.113549.1.9.16.3.18
value = ChaCha20-Poly1305
===================
key = Mac.HmacSHA224 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.SecretKeyFactory.1.2.840.113549.1.5.12
value = PBKDF2WithHmacSHA1
===================
key = Cipher.AES/GCM/NoPadding SupportedKeyFormats
value = RAW
===================
key = Mac.PBEWithHmacSHA512
value = com.sun.crypto.provider.PBMAC1Core$HmacSHA512
===================
key = KeyGenerator.HmacSHA256
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA256
===================
key = Cipher.AES_192/OFB/NoPadding
value = com.sun.crypto.provider.AESCipher$AES192_OFB_NoPadding
===================
key = Alg.Alias.Mac.OID.1.2.840.113549.2.7
value = HmacSHA1
===================
key = Alg.Alias.Mac.OID.1.2.840.113549.2.8
value = HmacSHA224
===================
key = Cipher.DESede
value = com.sun.crypto.provider.DESedeCipher
===================
key = Alg.Alias.Mac.OID.1.2.840.113549.2.11
value = HmacSHA512
===================
key = Alg.Alias.AlgorithmParameters.OID.2.16.840.1.101.3.4.1
value = AES
===================
key = Alg.Alias.Mac.OID.1.2.840.113549.2.10
value = HmacSHA384
===================
key = SecretKeyFactory.PBKDF2WithHmacSHA512
value = com.sun.crypto.provider.PBKDF2Core$HmacSHA512
===================
key = Alg.Alias.Mac.OID.1.2.840.113549.2.9
value = HmacSHA256
===================
key = Alg.Alias.Mac.OID.1.2.840.113549.2.13
value = HmacSHA512/256
===================
key = Alg.Alias.Mac.OID.1.2.840.113549.2.12
value = HmacSHA512/224
===================
key = AlgorithmParameters.Blowfish
value = com.sun.crypto.provider.BlowfishParameters
===================
key = Provider.id info
value = SunJCE Provider (implements RSA, DES, Triple DES, AES, Blowfish, ARCFOUR, RC2, PBE, Diffie-Hellman, HMAC, ChaCha20)
===================
key = KeyGenerator.HmacSHA224
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA224
===================
key = Cipher.ARCFOUR SupportedKeyFormats
value = RAW
===================
key = Mac.SslMacMD5
value = com.sun.crypto.provider.SslMacCore$SslMacMD5
===================
key = Alg.Alias.SecretKeyFactory.PBE
value = PBEWithMD5AndDES
===================
key = KeyFactory.DiffieHellman
value = com.sun.crypto.provider.DHKeyFactory
===================
key = Cipher.AES_256/KW/NoPadding SupportedKeyFormats
value = RAW
===================
key = AlgorithmParameters.PBEWithHmacSHA224AndAES_256
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA224AndAES_256
===================
key = AlgorithmParameters.PBEWithHmacSHA224AndAES_128
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA224AndAES_128
===================
key = Cipher.AES_192/CFB/NoPadding
value = com.sun.crypto.provider.AESCipher$AES192_CFB_NoPadding
===================
key = Mac.HmacSHA256 SupportedKeyFormats
value = RAW
===================
key = Cipher.PBEWithHmacSHA384AndAES_256
value = com.sun.crypto.provider.PBES2Core$HmacSHA384AndAES_256
===================
key = Cipher.AES/KWP/NoPadding SupportedKeyFormats
value = RAW
===================
key = Cipher.RC2 SupportedModes
value = ECB|CBC|PCBC|CTR|CTS|CFB|OFB|CFB8|CFB16|CFB24|CFB32|CFB40|CFB48|CFB56|CFB64|OFB8|OFB16|OFB24|OFB32|OFB40|OFB48|OFB56|OFB64
===================
key = Mac.HmacMD5
value = com.sun.crypto.provider.HmacMD5
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.24
value = AES_192/CFB/NoPadding
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.23
value = AES_192/OFB/NoPadding
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.26
value = AES_192/GCM/NoPadding
===================
key = Cipher.Blowfish SupportedKeyFormats
value = RAW
===================
key = Cipher.PBEWithHmacSHA224AndAES_256
value = com.sun.crypto.provider.PBES2Core$HmacSHA224AndAES_256
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.25
value = AES_192/KW/NoPadding
===================
key = Alg.Alias.AlgorithmParameters.1.2.840.113549.1.5.3
value = PBEWithMD5AndDES
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.22
value = AES_192/CBC/NoPadding
===================
key = Mac.HmacSHA3-256
value = com.sun.crypto.provider.HmacCore$HmacSHA3_256
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.21
value = AES_192/ECB/NoPadding
===================
key = SecretKeyFactory.PBEWithHmacSHA224AndAES_128
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA224AndAES_128
===================
key = SecretKeyFactory.PBKDF2WithHmacSHA1
value = com.sun.crypto.provider.PBKDF2Core$HmacSHA1
===================
key = Mac.HmacSHA3-256 SupportedKeyFormats
value = RAW
===================
key = Mac.SslMacSHA1 SupportedKeyFormats
value = RAW
===================
key = Cipher.DES
value = com.sun.crypto.provider.DESCipher
===================
key = KeyGenerator.AES
value = com.sun.crypto.provider.AESKeyGenerator
===================
key = Mac.PBEWithHmacSHA512 SupportedKeyFormats
value = RAW
===================
key = KeyGenerator.HmacSHA3-512
value = com.sun.crypto.provider.KeyGeneratorCore$HmacKG$SHA3_512
===================
key = Mac.HmacSHA3-384
value = com.sun.crypto.provider.HmacCore$HmacSHA3_384
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.28
value = AES_192/KWP/NoPadding
===================
key = Cipher.AES_192/KW/PKCS5Padding
value = com.sun.crypto.provider.KeyWrapCipher$AES192_KW_PKCS5Padding
===================
key = Cipher.AES_128/OFB/NoPadding SupportedKeyFormats
value = RAW
===================
key = Cipher.AES/KW/PKCS5Padding
value = com.sun.crypto.provider.KeyWrapCipher$AES_KW_PKCS5Padding
===================
key = Cipher.AES_192/CBC/NoPadding SupportedKeyFormats
value = RAW
===================
key = AlgorithmParameters.PBEWithSHA1AndRC2_128
value = com.sun.crypto.provider.PBEParameters
===================
key = Alg.Alias.SecretKeyFactory.1.2.840.113549.1.12.1.1
value = PBEWithSHA1AndRC4_128
===================
key = Alg.Alias.SecretKeyFactory.1.2.840.113549.1.12.1.3
value = PBEWithSHA1AndDESede
===================
key = Alg.Alias.SecretKeyFactory.1.2.840.113549.1.12.1.2
value = PBEWithSHA1AndRC4_40
===================
key = SecretKeyFactory.PBEWithMD5AndDES
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithMD5AndDES
===================
key = Mac.HmacSHA3-224 SupportedKeyFormats
value = RAW
===================
key = Cipher.AES_128/GCM/NoPadding SupportedModes
value = GCM
===================
key = Alg.Alias.AlgorithmParameters.OID.1.2.840.113549.1.9.16.3.18
value = ChaCha20-Poly1305
===================
key = SecretKeyFactory.PBEWithSHA1AndRC4_40
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithSHA1AndRC4_40
===================
key = Alg.Alias.SecretKeyFactory.1.2.840.113549.1.12.1.5
value = PBEWithSHA1AndRC2_128
===================
key = Cipher.AES_128/ECB/NoPadding
value = com.sun.crypto.provider.AESCipher$AES128_ECB_NoPadding
===================
key = Alg.Alias.SecretKeyFactory.1.2.840.113549.1.12.1.6
value = PBEWithSHA1AndRC2_40
===================
key = Mac.HmacSHA1
value = com.sun.crypto.provider.HmacSHA1
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.46
value = AES_256/GCM/NoPadding
===================
key = Cipher.AES_192/CBC/NoPadding
value = com.sun.crypto.provider.AESCipher$AES192_CBC_NoPadding
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.45
value = AES_256/KW/NoPadding
===================
key = Mac.HmacPBESHA224 SupportedKeyFormats
value = RAW
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.48
value = AES_256/KWP/NoPadding
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.42
value = AES_256/CBC/NoPadding
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.41
value = AES_256/ECB/NoPadding
===================
key = Cipher.RC2
value = com.sun.crypto.provider.RC2Cipher
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.44
value = AES_256/CFB/NoPadding
===================
key = Alg.Alias.Cipher.OID.2.16.840.1.101.3.4.1.43
value = AES_256/OFB/NoPadding
===================
key = Cipher.AES_256/OFB/NoPadding SupportedKeyFormats
value = RAW
===================
key = AlgorithmParameters.PBEWithHmacSHA384AndAES_128
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA384AndAES_128
===================
key = Alg.Alias.SecretKeyFactory.1.2.840.113549.1.5.3
value = PBEWithMD5AndDES
===================
key = SecretKeyFactory.PBKDF2WithHmacSHA224
value = com.sun.crypto.provider.PBKDF2Core$HmacSHA224
===================
key = Alg.Alias.Cipher.TripleDES
value = DESede
===================
key = Cipher.DES SupportedPaddings
value = NOPADDING|PKCS5PADDING|ISO10126PADDING
===================
key = Alg.Alias.AlgorithmParameterGenerator.DH
value = DiffieHellman
===================
key = Alg.Alias.Cipher.OID.1.2.840.113549.1.5.3
value = PBEWithMD5AndDES
===================
key = Cipher.PBEWithHmacSHA224AndAES_128
value = com.sun.crypto.provider.PBES2Core$HmacSHA224AndAES_128
===================
key = AlgorithmParameters.PBEWithHmacSHA384AndAES_256
value = com.sun.crypto.provider.PBES2Parameters$HmacSHA384AndAES_256
===================
key = Cipher.RSA SupportedPaddings
value = NOPADDING|PKCS1PADDING|OAEPPADDING|OAEPWITHMD5ANDMGF1PADDING|OAEPWITHSHA1ANDMGF1PADDING|OAEPWITHSHA-1ANDMGF1PADDING|OAEPWITHSHA-224ANDMGF1PADDING|OAEPWITHSHA-256ANDMGF1PADDING|OAEPWITHSHA-384ANDMGF1PADDING|OAEPWITHSHA-512ANDMGF1PADDING|OAEPWITHSHA-512/224ANDMGF1PADDING|OAEPWITHSHA-512/256ANDMGF1PADDING
===================
key = Cipher.Blowfish
value = com.sun.crypto.provider.BlowfishCipher
===================
key = AlgorithmParameters.GCM
value = com.sun.crypto.provider.GCMParameters
===================
key = SecretKeyFactory.PBEWithHmacSHA224AndAES_256
value = com.sun.crypto.provider.PBEKeyFactory$PBEWithHmacSHA224AndAES_256
提供者类class sun.security.jgss.SunProvider
===================
key = GssApiMechanism.1.2.840.113554.1.2.2
value = sun.security.jgss.krb5.Krb5MechFactory
===================
key = Provider.id version
value = 20
===================
key = GssApiMechanism.1.3.6.1.5.5.2
value = sun.security.jgss.spnego.SpNegoMechFactory
===================
key = Provider.id className
value = sun.security.jgss.SunProvider
===================
key = Provider.id info
value = Sun (Kerberos v5, SPNEGO)
===================
key = Provider.id name
value = SunJGSS
提供者类class com.sun.security.sasl.Provider
===================
key = SaslServerFactory.CRAM-MD5
value = com.sun.security.sasl.ServerFactoryImpl
===================
key = SaslClientFactory.DIGEST-MD5
value = com.sun.security.sasl.digest.FactoryImpl
===================
key = SaslClientFactory.CRAM-MD5
value = com.sun.security.sasl.ClientFactoryImpl
===================
key = Provider.id version
value = 20
===================
key = Provider.id info
value = Sun SASL provider(implements client mechanisms for: DIGEST-MD5, EXTERNAL, PLAIN, CRAM-MD5, NTLM; server mechanisms for: DIGEST-MD5, CRAM-MD5, NTLM)
===================
key = Provider.id name
value = SunSASL
===================
key = SaslServerFactory.NTLM
value = com.sun.security.sasl.ntlm.FactoryImpl
===================
key = SaslClientFactory.EXTERNAL
value = com.sun.security.sasl.ClientFactoryImpl
===================
key = Provider.id className
value = com.sun.security.sasl.Provider
===================
key = SaslClientFactory.NTLM
value = com.sun.security.sasl.ntlm.FactoryImpl
===================
key = SaslClientFactory.PLAIN
value = com.sun.security.sasl.ClientFactoryImpl
===================
key = SaslServerFactory.DIGEST-MD5
value = com.sun.security.sasl.digest.FactoryImpl
提供者类class org.jcp.xml.dsig.internal.dom.XMLDSigRI
===================
key = TransformService.http://www.w3.org/2006/12/xml-c14n11#WithComments MechanismType
value = DOM
===================
key = Alg.Alias.TransformService.BASE64
value = http://www.w3.org/2000/09/xmldsig#base64
===================
key = Provider.id version
value = 20
===================
key = TransformService.http://www.w3.org/TR/1999/REC-xslt-19991116
value = org.jcp.xml.dsig.internal.dom.DOMXSLTTransform
===================
key = Alg.Alias.TransformService.EXCLUSIVE
value = http://www.w3.org/2001/10/xml-exc-c14n#
===================
key = TransformService.http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments
value = org.jcp.xml.dsig.internal.dom.DOMCanonicalXMLC14NMethod
===================
key = TransformService.http://www.w3.org/2000/09/xmldsig#enveloped-signature MechanismType
value = DOM
===================
key = TransformService.http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments MechanismType
value = DOM
===================
key = Provider.id info
value = XMLDSig (DOM XMLSignatureFactory; DOM KeyInfoFactory; C14N 1.0, C14N 1.1, Exclusive C14N, Base64, Enveloped, XPath, XPath2, XSLT TransformServices)
===================
key = TransformService.http://www.w3.org/2002/06/xmldsig-filter2 MechanismType
value = DOM
===================
key = XMLSignatureFactory.DOM
value = org.jcp.xml.dsig.internal.dom.DOMXMLSignatureFactory
===================
key = Alg.Alias.TransformService.INCLUSIVE
value = http://www.w3.org/TR/2001/REC-xml-c14n-20010315
===================
key = TransformService.http://www.w3.org/2000/09/xmldsig#base64 MechanismType
value = DOM
===================
key = TransformService.http://www.w3.org/2002/06/xmldsig-filter2
value = org.jcp.xml.dsig.internal.dom.DOMXPathFilter2Transform
===================
key = Provider.id className
value = org.jcp.xml.dsig.internal.dom.XMLDSigRI
===================
key = TransformService.http://www.w3.org/2001/10/xml-exc-c14n#WithComments MechanismType
value = DOM
===================
key = Alg.Alias.TransformService.XPATH2
value = http://www.w3.org/2002/06/xmldsig-filter2
===================
key = TransformService.http://www.w3.org/TR/2001/REC-xml-c14n-20010315 MechanismType
value = DOM
===================
key = Alg.Alias.TransformService.INCLUSIVE_WITH_COMMENTS
value = http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments
===================
key = TransformService.http://www.w3.org/2001/10/xml-exc-c14n# MechanismType
value = DOM
===================
key = Alg.Alias.TransformService.XSLT
value = http://www.w3.org/TR/1999/REC-xslt-19991116
===================
key = TransformService.http://www.w3.org/2006/12/xml-c14n11
value = org.jcp.xml.dsig.internal.dom.DOMCanonicalXMLC14N11Method
===================
key = TransformService.http://www.w3.org/TR/1999/REC-xpath-19991116 MechanismType
value = DOM
===================
key = TransformService.http://www.w3.org/2001/10/xml-exc-c14n#WithComments
value = org.jcp.xml.dsig.internal.dom.DOMExcC14NMethod
===================
key = TransformService.http://www.w3.org/TR/1999/REC-xpath-19991116
value = org.jcp.xml.dsig.internal.dom.DOMXPathTransform
===================
key = TransformService.http://www.w3.org/TR/2001/REC-xml-c14n-20010315
value = org.jcp.xml.dsig.internal.dom.DOMCanonicalXMLC14NMethod
===================
key = Alg.Alias.TransformService.ENVELOPED
value = http://www.w3.org/2000/09/xmldsig#enveloped-signature
===================
key = Alg.Alias.TransformService.EXCLUSIVE_WITH_COMMENTS
value = http://www.w3.org/2001/10/xml-exc-c14n#WithComments
===================
key = TransformService.http://www.w3.org/2000/09/xmldsig#enveloped-signature
value = org.jcp.xml.dsig.internal.dom.DOMEnvelopedTransform
===================
key = TransformService.http://www.w3.org/2000/09/xmldsig#base64
value = org.jcp.xml.dsig.internal.dom.DOMBase64Transform
===================
key = Provider.id name
value = XMLDSig
===================
key = TransformService.http://www.w3.org/TR/1999/REC-xslt-19991116 MechanismType
value = DOM
===================
key = TransformService.http://www.w3.org/2001/10/xml-exc-c14n#
value = org.jcp.xml.dsig.internal.dom.DOMExcC14NMethod
===================
key = KeyInfoFactory.DOM
value = org.jcp.xml.dsig.internal.dom.DOMKeyInfoFactory
===================
key = TransformService.http://www.w3.org/2006/12/xml-c14n11#WithComments
value = org.jcp.xml.dsig.internal.dom.DOMCanonicalXMLC14N11Method
===================
key = TransformService.http://www.w3.org/2006/12/xml-c14n11 MechanismType
value = DOM
===================
key = Alg.Alias.TransformService.XPATH
value = http://www.w3.org/TR/1999/REC-xpath-19991116
提供者类class sun.security.smartcardio.SunPCSC
===================
key = Provider.id version
value = 20
===================
key = Provider.id className
value = sun.security.smartcardio.SunPCSC
===================
key = TerminalFactory.PC/SC
value = sun.security.smartcardio.SunPCSC$Factory
===================
key = Provider.id info
value = Sun PC/SC provider
===================
key = Provider.id name
value = SunPCSC
提供者类class sun.security.provider.certpath.ldap.JdkLDAP
===================
key = CertStore.LDAP ImplementedIn
value = Software
===================
key = CertStore.LDAP
value = sun.security.provider.certpath.ldap.LDAPCertStore
===================
key = Provider.id version
value = 20
===================
key = Provider.id className
value = sun.security.provider.certpath.ldap.JdkLDAP
===================
key = CertStore.LDAP LDAPSchema
value = RFC2587
===================
key = Provider.id info
value = JdkLDAP Provider (implements LDAP CertStore)
===================
key = Provider.id name
value = JdkLDAP
提供者类class com.sun.security.sasl.gsskerb.JdkSASL
===================
key = Provider.id version
value = 20
===================
key = Provider.id className
value = com.sun.security.sasl.gsskerb.JdkSASL
===================
key = Provider.id info
value = JDK SASL provider(implements client and server mechanisms for GSSAPI)
===================
key = SaslServerFactory.GSSAPI
value = com.sun.security.sasl.gsskerb.FactoryImpl
===================
key = Provider.id name
value = JdkSASL
===================
key = SaslClientFactory.GSSAPI
value = com.sun.security.sasl.gsskerb.FactoryImpl
提供者类class sun.security.mscapi.SunMSCAPI
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.12
value = SHA384withRSA
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.11
value = SHA256withRSA
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.13
value = SHA512withRSA
===================
key = KeyPairGenerator.RSA KeySize
value = 16384
===================
key = SecureRandom.Windows-PRNG ThreadSafe
value = true
===================
key = Alg.Alias.Signature.OID.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = Signature.SHA512withECDSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = KeyPairGenerator.RSA
value = sun.security.mscapi.CKeyPairGenerator$RSA
===================
key = Signature.RSASSA-PSS SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Cipher.RSA SupportedModes
value = ECB
===================
key = Signature.SHA512withRSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Signature.SHA384withRSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = KeyStore.Windows-MY-CURRENTUSER
value = sun.security.mscapi.CKeyStore$MY
===================
key = Signature.SHA1withRSA
value = sun.security.mscapi.CSignature$SHA1withRSA
===================
key = Signature.SHA256withRSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = KeyStore.Windows-MY-LOCALMACHINE
value = sun.security.mscapi.CKeyStore$MYLocalMachine
===================
key = KeyStore.Windows-ROOT-LOCALMACHINE
value = sun.security.mscapi.CKeyStore$ROOTLocalMachine
===================
key = KeyStore.Windows-ROOT-CURRENTUSER
value = sun.security.mscapi.CKeyStore$ROOT
===================
key = Signature.SHA512withECDSA
value = sun.security.mscapi.CSignature$SHA512withECDSA
===================
key = Signature.SHA256withECDSA
value = sun.security.mscapi.CSignature$SHA256withECDSA
===================
key = Signature.MD5withRSA
value = sun.security.mscapi.CSignature$MD5withRSA
===================
key = Signature.MD5withRSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Cipher.RSA/ECB/PKCS1Padding SupportedPaddings
value = PKCS1PADDING
===================
key = Cipher.RSA/ECB/PKCS1Padding
value = sun.security.mscapi.CRSACipher
===================
key = Signature.SHA512withRSA
value = sun.security.mscapi.CSignature$SHA512withRSA
===================
key = Alg.Alias.Signature.PSS
value = RSASSA-PSS
===================
key = Alg.Alias.Signature.1.2.840.10045.4.3.4
value = SHA512withECDSA
===================
key = Alg.Alias.Signature.1.2.840.10045.4.3.2
value = SHA256withECDSA
===================
key = Alg.Alias.Signature.1.2.840.10045.4.3.3
value = SHA384withECDSA
===================
key = Provider.id version
value = 20
===================
key = Signature.SHA384withECDSA
value = sun.security.mscapi.CSignature$SHA384withECDSA
===================
key = Signature.NONEwithRSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Signature.RSASSA-PSS
value = sun.security.mscapi.CSignature$PSS
===================
key = Provider.id info
value = Sun's Microsoft Crypto API provider
===================
key = Cipher.RSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Cipher.RSA/ECB/PKCS1Padding SupportedModes
value = ECB
===================
key = Signature.SHA1withRSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.1
value = SHA1withECDSA
===================
key = Alg.Alias.Signature.1.2.840.10045.4.3.1
value = SHA224withECDSA
===================
key = Signature.SHA384withRSA
value = sun.security.mscapi.CSignature$SHA384withRSA
===================
key = Signature.MD2withRSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Provider.id className
value = sun.security.mscapi.SunMSCAPI
===================
key = Cipher.RSA
value = sun.security.mscapi.CRSACipher
===================
key = Signature.SHA224withECDSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Signature.SHA1withECDSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.10
value = RSASSA-PSS
===================
key = Signature.SHA256withRSA
value = sun.security.mscapi.CSignature$SHA256withRSA
===================
key = Signature.SHA384withECDSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = KeyStore.Windows-ROOT
value = sun.security.mscapi.CKeyStore$ROOT
===================
key = KeyStore.Windows-MY
value = sun.security.mscapi.CKeyStore$MY
===================
key = Provider.id name
value = SunMSCAPI
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.11
value = SHA256withRSA
===================
key = SecureRandom.Windows-PRNG
value = sun.security.mscapi.PRNG
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.12
value = SHA384withRSA
===================
key = Alg.Alias.Signature.1.2.840.113549.1.1.13
value = SHA512withRSA
===================
key = Cipher.RSA/ECB/PKCS1Padding SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Signature.NONEwithRSA
value = sun.security.mscapi.CSignature$NONEwithRSA
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.3.2
value = SHA256withECDSA
===================
key = Signature.MD2withRSA
value = sun.security.mscapi.CSignature$MD2withRSA
===================
key = Signature.SHA1withECDSA
value = sun.security.mscapi.CSignature$SHA1withECDSA
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.3.3
value = SHA384withECDSA
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.3.4
value = SHA512withECDSA
===================
key = Signature.SHA224withECDSA
value = sun.security.mscapi.CSignature$SHA224withECDSA
===================
key = Signature.SHA256withECDSA SupportedKeyClasses
value = sun.security.mscapi.CKey
===================
key = Alg.Alias.Signature.OID.1.2.840.10045.4.3.1
value = SHA224withECDSA
===================
key = Alg.Alias.Signature.1.2.840.10045.4.1
value = SHA1withECDSA
===================
key = Cipher.RSA SupportedPaddings
value = PKCS1PADDING
提供者类class sun.security.pkcs11.SunPKCS11
===================
key = Provider.id version
value = 20
===================
key = Provider.id className
value = sun.security.pkcs11.SunPKCS11
===================
key = Provider.id info
value = Unconfigured and unusable PKCS11 provider
===================
key = Provider.id name
value = SunPKCS11
算法分类 = [Policy, Configuration, AlgorithmParameterGenerator, TransformService, CertificateFactory, KeyInfoFactory, CertPathBuilder, MessageDigest, KeyAgreement, SecretKeyFactory, KeyGenerator, KeyFactory, XMLSignatureFactory, SaslServerFactory, TerminalFactory, SecureRandom, SaslClientFactory, KeyPairGenerator, SSLContext, KeyStore, Mac, Provider, KeyManagerFactory, CertPathValidator, Signature, TrustManagerFactory, Cipher, Alg, CertStore, GssApiMechanism, AlgorithmParameters]
```
