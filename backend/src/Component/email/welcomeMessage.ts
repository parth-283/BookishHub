const welcomeMessage = (verificationUrl: string): string => {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Verification</title>
        <style>
            /* Global Styles */
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #333333;
                text-align: center;
                margin-bottom: 20px;
            }
    
            p {
                color: #666666;
                line-height: 1.6;
                margin-bottom: 10px;
            }
    
            a {
                color: #007bff;
                text-decoration: none;
            }
    
            a:hover {
                text-decoration: underline;
            }
    
            /* Book Image Styles */
            .book-image {
                margin: 0 auto;
                display: block;
                width: 200px;
                height: auto;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1>Welcome to BookishHub!</h1>
            <img src="https://source.unsplash.com/featured/200x300/?book" alt="Book Cover" class="book-image">
            <p>Thank you for joining us. We're excited to have you on board.</p>
            <p>To get started, please verify your email address by clicking the link below:</p>
            <p><a href=${verificationUrl} target="_blank">Verify Email Address</a></p>
            <p>If you have any questions or need assistance, feel free to contact us.</p>
            <p>Happy reading!</p>
        </div>
    </body>
    
    </html>
    `;
};
export default welcomeMessage;
