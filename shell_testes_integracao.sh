#!/bin/bash

BASE_URL="http://localhost:3000"
HEADERS="Content-Type: application/json"

# Função para executar o comando curl e exibir a resposta
execute_curl() {
  local command="$1"
  local description="$2"
  
  echo "----------------------------------------"
  echo "Executing: $description"
  echo "Command: $command"
  
  response=$(eval $command)
  
  echo "Response: $response"
  echo "----------------------------------------"
}

# Testes para operação PUT
execute_curl "curl -X PUT $BASE_URL/ -H \"$HEADERS\" -d '{\"id\": 33, \"ExpressionAttributeValues\": \"set Ativo = :ativo\", \"UpdateExpression\": \"madrid\"}'" "Update with ExpressionAttributeValues as string"

execute_curl "curl -X PUT $BASE_URL/ -H \"$HEADERS\" -d '{\"id\": 1, \"ExpressionAttributeValues\": \"set Ativo = :ativo\", \"UpdateExpression\": {\":ativo\": true }}'" "Update with ExpressionAttributeValues as object"

execute_curl "curl -X PUT $BASE_URL/ -H \"$HEADERS\" -d '{}'" "Update with empty body"

# Testes para operação POST
execute_curl "curl -X POST $BASE_URL/ -H \"$HEADERS\" -d '{}'" "Create with empty body"

execute_curl "curl -X POST $BASE_URL/ -H \"$HEADERS\" -d '{\"id\": 1, \"NomeCompleto\": \"Timidim gatinho (dorme)\", \"DataNascimento\": \"1990-01-01\", \"Ativo\": true, \"Enderecos\": [{\"Rua\": \"Nome da Rua\", \"Numero\": 123}], \"Contatos\": [{\"Tipo\": \"Email\", \"Valor\": \"fulano@email.com\", \"Principal\": true}, {\"Tipo\": \"Telefone\", \"Valor\": \"123-456-7890\", \"Principal\": false}]}'" "Create with valid body"

# Teste para operação DELETE
execute_curl "curl -X DELETE $BASE_URL/2" "Delete with valid ID"

# Teste adicional para operação POST após DELETE
execute_curl "curl -X POST $BASE_URL/ -H \"$HEADERS\" -d '{\"id\": 11, \"NomeCompleto\": \"Timidim gatinho (dorme)\", \"DataNascimento\": \"1990-01-01\", \"Ativo\": true, \"Enderecos\": [{\"Rua\": \"Nome da Rua\", \"Numero\": 123}], \"Contatos\": [{\"Tipo\": \"Email\", \"Valor\": \"fulano@email.com\", \"Principal\": true}, {\"Tipo\": \"Telefone\", \"Valor\": \"123-456-7890\", \"Principal\": false}]}'" "Create after delete"
