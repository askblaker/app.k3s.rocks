export const commands = {
	ls: 'ls -lah',
	install: `
    DEBIAN_FRONTEND=noninteractive sudo -S apt-get update && \
	DEBIAN_FRONTEND=noninteractive sudo -S apt-get upgrade -y && \
	DEBIAN_FRONTEND=noninteractive sudo -S apt-get install curl -y && \
	DEBIAN_FRONTEND=noninteractive sudo -S apt-get install ca-certificates -y && \
	DEBIAN_FRONTEND=noninteractive sudo -S apt-get install open-iscsi -y && \
	DEBIAN_FRONTEND=noninteractive sudo -S apt-get install wireguard -y
    `,
	installK3s: `
	DEBIAN_FRONTEND=noninteractive sudo -S curl -sfL https://get.k3s.io | DEBIAN_FRONTEND=noninteractive INSTALL_K3S_VERSION=v1.25.4+k3s1 sudo -S sh -s server \
	--cluster-init \
	--flannel-backend=wireguard && \
	export KUBECONFIG=/etc/rancher/k3s/k3s.yaml && \
	curl https://raw.githubusercontent.com/askblaker/k3s.rocks/main/manifests/traefik-config.yaml | envsubst | DEBIAN_FRONTEND=noninteractive sudo -S kubectl apply -f -
  `
};
