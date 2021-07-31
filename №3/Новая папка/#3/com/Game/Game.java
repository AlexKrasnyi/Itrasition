package com.github.alexkrasniy;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

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
            if (playerMoveNumber < 1 || playerMoveNumber > length) {
                System.out.println("Your move is incorrect!");
                playerMoveNumber = -1;
            }
        }

        int playerMove = playerMoveNumber - 1;
        System.out.println("Your move is: " + args[playerMove]);
        System.out.println("Computer move is: " + args[computerMove]);

        computeWinner(length, computerMove, playerMove);
        String keyEncoded = asHexString(key);
        System.out.println("HMAC key: " + keyEncoded);

    }

    private static void computeWinner(int length, int computerMove, int playerMove) {
        if (playerMove == computerMove) {
            System.out.println("No one win, draw!");
        }

        int half = length / 2;
        // 1 2 3 4 5
        // 2 1  (2-1) =  1 true
        // 3 1  (3-1) =  2 true
        // 4 1  (4-1) =  3 false
        // 5 1  (5-1) =  4 false
        // 1 5  (1-5) = -4 true
        // 1 4  (1-4) = -3 true
        // 1 3  (1-3) = -2 false
        // 1 2  (1-2) = -1 false
        int difference = playerMove - computerMove;
        if ((difference < 0 && Math.abs(difference) > half)
            || (difference > 0 && Math.abs(difference) <= half)) {
            System.out.println("You win!");
        } else {
            System.out.println("Computer win!");
        }
    }

    private static int getPlayerMove() {
        try {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
            final String input = bufferedReader.readLine();
            return Integer.parseInt(input);
        } catch (NumberFormatException ex) {
            System.out.println("Not a number!");
            return -1;
        } catch (IOException e) {
            System.out.println("Some input error occurred: " + e.getMessage());
            return -1;
        }
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
        return asHexString(sha256Hmac.doFinal(data.getBytes()));
    }

    private static String asHexString(byte[] key) {
        return new BigInteger(1, key).toString(16).toUpperCase();
    }
}
