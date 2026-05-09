package com.ai.ats.Controller;

import com.ai.ats.Entity.ContactRequest;
import com.ai.ats.Service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendContactMessage(@Valid @RequestBody ContactRequest contactRequest) {
        try {
            String recipientEmail = "davybansal714@gmail.com";
            String subject = "New Contact Form Submission: " + contactRequest.getSubject();

            String emailBody = buildEmailBody(contactRequest);
            emailService.sendSimpleEmail(recipientEmail, subject, emailBody);

            String userSubject = "Thank you for contacting JobPortal";
            String userBody = buildConfirmationEmail(contactRequest);
            emailService.sendSimpleEmail(contactRequest.getEmail(), userSubject, userBody);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Your message has been sent successfully!");
            response.put("timestamp", LocalDateTime.now());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to send message. Please try again.");
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    private String buildEmailBody(ContactRequest request) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        return String.format(
                "NEW CONTACT FORM SUBMISSION\n\n" +
                        "Date & Time: %s\n\n" +
                        "Name: %s\n" +
                        "Email: %s\n\n" +
                        "Subject:\n%s\n\n" +
                        "Message:\n%s\n",
                LocalDateTime.now().format(formatter),
                request.getName(),
                request.getEmail(),
                request.getSubject(),
                request.getMessage()
        );
    }

    private String buildConfirmationEmail(ContactRequest request) {
        return String.format(
                "Dear %s,\n\nThank you for contacting JobPortal.\n\n" +
                        "We received your message about:\n\"%s\"\n\n" +
                        "Our team will contact you soon.\n\nRegards,\nDavi Bansal (Owner of the portal)",
                request.getName(),
                request.getSubject()
        );
    }
}
