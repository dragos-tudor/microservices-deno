[ ! -d "./.certificates" ] && mkdir ./.certificates
[ ! -f "./.certificates/localhost.pem" ] && cd ./.certificates && mkcert localhost