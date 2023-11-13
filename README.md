
## Microservices with deno

Proof of concept microservices project with Deno.

### Installation
- download [vscode](https://code.visualstudio.com/download).
- install [Docker](https://docs.docker.com/engine/install/).
- install vscode [remote container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.
- clone this repository.
- open repository folder in vscode dev container.
- run script `./certificates.sh` to generate public certificate and private key for `localhost` domain.

### Using
- run script `./starting.sh`.
- run http request step by step starting with `.http-client/identity.http` and then `notifications.http` and `loans.http`.

### Description
- [identity microservice](./identity-api): identity api [support/public].
  - register account.
  - change account password.
  - login user.
  - register activation link and send an activation link email to notification service.
  - use activation link to activate account.
  - generate jwt authentication token [testing purpose].
  - get activation link [testing purpose].
- [loans microservice](./loans-api): loans api [business/public].
  - register contract and calculate interest rate.
  - approve contract.
  - reject contract.
- [notifications microservice](./notifications-api): notifications api [support/private].
  - register notifications.
  - send notifications to external services.
- [monitor microservices](./monitor-api): monitoring api [support/public].
  - monitor microservices health (live health).

### Observations
- [std-modules](./std-modules/) contains standard modules [see .Net framework].
- [webapi-modules](./webapi-modules/) contains webapi modules [see ASP.Net framework].
- [identity microservice](./identity-api/) use mediator to publish internal messages and to chain multiple message handlers. Use scheduler to resume failed handled messages.
- [loans microservice](./loans-api/) use in-process caching for discout and interest types [rarely changed].
- [notifications microservice](./notifications-api/) use jwt authentication and is used by [identity microservice](./identity-api/).
- [identity microservice](./identity-api/) and [monitor microservices](./monitor-api) use resilient fetch to communicate with other microservices.

### Security
- public microservices use cookie as authentication mechanism.
- private microservice(s) use jwt as authentication mechanism.
- microservices use an distributed authorization mechanism based on account roles.
- public microservices use rate limiting per ip/global to avoid dos/ddos.
- db queries use parameters [no sql query concatenations].
- use encryption key to encrypt/decrypt authentication/identity cookies.
- use signing key to sign/verify jwt authentication tokens.

wip [cors, http cache]