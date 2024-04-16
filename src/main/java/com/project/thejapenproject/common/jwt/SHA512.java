package com.project.thejapenproject.common.jwt;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHA512 {

    public static String encrypt(String text) throws NoSuchAlgorithmException{
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-512");
        messageDigest.reset();
        messageDigest.update(text.getBytes(StandardCharsets.UTF_8));
        return String.format("%0128x", new BigInteger(1, messageDigest.digest()));
    }


}
