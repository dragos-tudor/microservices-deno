ARG BASE_IMAGE=ubuntu:22.04
FROM --platform=linux/amd64 ${BASE_IMAGE}

RUN apt update && \
    apt -y install --no-install-recommends --no-install-suggests ca-certificates curl git mkcert nano unzip && \
    apt -y autoremove && \
    apt -y clean && \
    rm -rf /var/lib/apt/lists/*

ARG USER=vscode
ARG GROUP=vscode
ARG USER_HOME="/home/${USER}"
RUN groupadd -g 1000 ${USER} && \
    useradd -m -d ${USER_HOME} -s /bin/bash -g 1000 -u 1000 ${GROUP}

USER ${USER}

ARG DENO_VERSION=v1.37.0
ENV DENO_DIR="${USER_HOME}/.deno"
RUN curl -fsSL https://github.com/denoland/deno/releases/download/${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip -o ${USER_HOME}/deno.zip && \
    unzip -d ${DENO_DIR} -o ${USER_HOME}/deno.zip && \
    chmod +x ${DENO_DIR}/deno && \
    rm ${USER_HOME}/deno.zip

RUN mkcert
RUN echo export DENO_CERT="$(mkcert -CAROOT)/rootCA.pem" >> ${USER_HOME}/.bashrc

ENV PATH="${PATH}:${DENO_DIR}"






