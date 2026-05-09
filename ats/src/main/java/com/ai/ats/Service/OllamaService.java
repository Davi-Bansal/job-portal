package com.ai.ats.Service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class OllamaService {

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String OLLAMA_URL = "http://localhost:11434/api/generate";

    public String ask(String prompt) {
        try {
            System.out.println("=== CALLING OLLAMA API ===");

            // ✅ REQUEST BODY
            Map<String, Object> body = new HashMap<>();
            body.put("model", "phi");
            body.put("prompt", prompt);
            body.put("stream", false);
            body.put("options", Map.of(
                    "temperature", 0.7,
                    "num_predict", 500  // Limit response length
            ));

            // ✅ HEADERS
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            System.out.println("Sending request to Ollama...");

            // ✅ CALL API
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    OLLAMA_URL,
                    request,
                    Map.class
            );

            System.out.println("Ollama response status: " + response.getStatusCode());

            if (response.getBody() != null && response.getBody().containsKey("response")) {
                String aiResponse = response.getBody().get("response").toString();
                System.out.println("AI Response length: " + aiResponse.length());
                return aiResponse;
            }

            System.err.println("No response from Ollama");
            return "AI analysis unavailable";

        } catch (Exception e) {
            System.err.println("=== OLLAMA ERROR ===");
            e.printStackTrace();

            return "AI service error: " + e.getMessage() +
                    "\n\nMake sure Ollama is running: ollama serve";
        }
    }
}