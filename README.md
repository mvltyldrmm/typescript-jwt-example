Login/Refresh/Verify JWT EXAMPLE.

<strong>CREATE KEY:</strong>
<h1>
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

npm i
npm run dev

PORT : 6060
