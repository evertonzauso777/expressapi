# ExpressAPI

Este repositório contém uma API desenvolvida em Node.js, juntamente com configurações para deploy utilizando Helm e Kubernetes.

## Funcionalidades

* Exemplo: Hello World Helm Kubernetes

## Tecnologias Utilizadas

* Node.js
* Express.js 
* Docker
* Kubernetes
* Helm

## Pré-requisitos

* Node.js
* npm ou yarn
* Docker
* kubectl
* Helm

## Estrutura do Repositório

```
/
|-- src/                # Código-fonte da API
|-- pipelines/
    |-- helm/           # Configurações do Helm
    |-- k8s/            # Manifests do Kubernetes
|-- package.json       # Dependências e scripts
|-- README.md          # Documentação
|-- Dockerfile         # Dockerfile
|-- server.js          # Server Node
```

## Instalação e Execução Local

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie a API:
   ```sh
   npm start
   ```

## Deploy com Helm

Para implantar a aplicação usando Helm:

```sh
helm upgrade --install {release_name} ./pipelines/helm
```

## Deploy com Kubectl

Para implantar a aplicação manualmente no Kubernetes:

```sh
kubectl apply -f pipelines/k8s/
```

## Contribuição

1. Fork este repositório.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Commit suas alterações (`git commit -m 'Minha nova feature'`).
4. Faça um push para a branch (`git push origin minha-feature`).
5. Abra um Pull Request.

## 🎁 Expressões de gratidão
* Valeu pessoal, dúvidas é só chamar 📢;
