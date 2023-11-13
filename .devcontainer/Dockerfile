ARG BASE_IMAGE=denoland/deno:debian-1.37.0
FROM --platform=linux/amd64 ${BASE_IMAGE}

RUN apt update && \
    apt -y install --no-install-recommends --no-install-suggests ca-certificates git mkcert nano && \
    apt -y autoremove && \
    apt -y clean && \
    rm -rf /var/lib/apt/lists/*

COPY ./.bashrc /home/deno/.bashrc

ARG DENO_SHARE=/home/deno/.local/share
RUN mkdir -p ${DENO_SHARE} && \
		mkcert --install && \
		mv $(mkcert -CAROOT) ${DENO_SHARE} && \
		echo export DENO_CERT="${DENO_SHARE}/mkcert/rootCA.pem" >> /home/deno/.bashrc
		
RUN groupmod -g 1000 deno && \
		usermod -u 1000 -s /bin/bash deno && \
		chown deno:deno -R /home/deno && \
		chown deno:deno -R /deno-dir

USER deno






