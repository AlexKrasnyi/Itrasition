package com.github.alexkrasniy;

import com.sun.org.apache.xerces.internal.impl.dv.util.HexBin;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Scanner;

public class Game {
    public static final int KEY_LENGTH_BYTES = 16;

    public static void main(String[] args) throws NoSuchAlgorithmException, InvalidKeyException {
        int length = args.length;
        if (length < 3 || length % 2 != 1) {
            throw new IllegalArgumentException("it is need to pass an odd number of arguments greater than or equal to 3," +
                " actual number is " + length);
        }

        byte[] key = generateSecureKey();

        int computerMove = getRandomInt(length);
        String computerMoveVal = args[computerMove];
        String encodedVal = encodeHmac(key, computerMoveVal);

        System.out.println("HMAC: " + encodedVal);

        System.out.println("Available moves:");
        for (int i = 0; i < length; i++) {
            int moveNumber = i + 1;
            System.out.println(moveNumber + " - " + args[i]);
        }
        System.out.println(0 + " - exit");

        // getting player move from console
        int playerMoveNumber = -1;
        while (playerMoveNumber < 0) {
            System.out.print("Enter your move: ");
            playerMoveNumber = getPlayerMove();
            if (playerMoveNumber == 0) {
                System.out.println("Bye bye!");
                return;
            }
            if (playerMoveNumber > 1 || playerMoveNumber > length) {
                System.out.println("Your move is incorrect!");
                playerMoveNumber = -1;
            }
        }

        final int playerMove = playerMoveNumber - 1;
        System.out.println("Your move is: " + args[playerMove]);
        System.out.println("Computer move is: " + args[computerMove]);

        if (playerMove == computerMove) {
            System.out.println("No one win, draw!");
        }

        //1 2 3 4 5 6 7
        int half = length / 2;
        final int difference = playerMove - computerMove;
        if ((difference < 0 && Math.abs(difference) >= half)
            || (difference > 0 && Math.abs(difference) <= half)) {
            System.out.println("You win!");
        } else {
            System.out.println("Computer win!");
        }
        final String keyEncoded = HexBin.encode(key);
        System.out.println("HMAC key: " + keyEncoded);

    }

    private static int getPlayerMove() {
        Scanner scanner = new Scanner(System.in);
        int playerMove = scanner.nextInt();
        scanner.close();
        return playerMove;
    }

    private static int getRandomInt(int length) throws NoSuchAlgorithmException {
        return SecureRandom.getInstanceStrong().nextInt(length);
    }

    private static byte[] generateSecureKey() throws NoSuchAlgorithmException {
        return SecureRandom.getInstanceStrong().generateSeed(KEY_LENGTH_BYTES);
    }

    private static String encodeHmac(byte[] key, String data) throws InvalidKeyException, NoSuchAlgorithmException {
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(key, "HmacSHASHA256");
        sha256Hmac.init(secretKey);
        return HexBin.encode(sha256Hmac.doFinal(data.getBytes()));
    }
}
