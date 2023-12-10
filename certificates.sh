set -e

mkcert
echo "export DENO_CERT=$(mkcert -CAROOT)/rootCA.pem" >> $HOME/.bashrc

[ ! -d "./.certificates" ] && mkdir ./.certificates
[ ! -f "./.certificates/localhost.pem" ] && cd ./.certificates && mkcert localhost
