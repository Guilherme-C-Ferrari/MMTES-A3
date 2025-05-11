#from typing import Union
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.controladores.usuario_controlador import UsuarioControlador
from backend.controladores.autenticacao_controlador import AutenticacaoControlador
import uvicorn

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========================== 

if __name__ == "__main__":
  uvicorn.run("URLs:app", host="0.0.0.0", port=8000, reload=True)
  

@app.get("/", tags=["Root"])
async def read_root():
  return { 
    "hello world"
   }

# ========================== Usuario

@app.get("/usuarios/lista_de_usuarios")
async def listar_usuarios():
    return UsuarioControlador.listar_todos_os_usuarios()

@app.put("/usuarios/registro/{nome}/{email}/{senha}/{data_de_nascimento}/{bio}/{nickname}")
async def registrar_usuario(nome: str, email: str, senha: str, data_de_nascimento: str, bio: str, nickname: str):
    return UsuarioControlador.adicionar_usuario(nome, email, senha, data_de_nascimento, bio, nickname)

@app.patch("/usuarios/edição/{nickname}/{email}")
async def editar_usuario_por_nickname(nickname: str, email: str, token: str):
    checagem = AutenticacaoControlador.checar_chave(token, nickname)
    if (checagem == True):
        return UsuarioControlador.editar_usuario_por_nickname(nickname, email)
    else:
        return {"message": "Não autenticado"}

@app.patch("/usuarios/nova_senha/{nickname}/{nova_senha}")
async def editar_senha_do_usuario(nickname: str, nova_senha: str, token: str):
    checagem = AutenticacaoControlador.checar_chave(token, nickname)
    if (checagem == True):
        return UsuarioControlador.editar_senha_do_usuario(nickname, nova_senha)
    else:
        return {"message": "Não autenticado"}

@app.delete("/usuarios/remoção/{nickname}")
async def remover_usuario_por_nickname(nickname: str, token: str):
    checagem = AutenticacaoControlador.checar_chave(token, nickname)
    if (checagem == True):
        return UsuarioControlador.remover_usuario_por_nickname(nickname)
    else:
        return {"message": "Não autenticado"}

# ========================== Auth

@app.post("/autenticacao/{nickname}/{senha}/")
def autenticar(nickname: str, senha: str):
    return AutenticacaoControlador.autenticar(nickname, senha)