from backend.modelos.autenticacao_sessao import AutenticacaoSessao
from datetime import datetime, timedelta
import hashlib

# DB da autenticação aplicando singleton.
class AutenticacaoDB():

    _instance = None
    _sessoes : list[AutenticacaoSessao] = []

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = AutenticacaoDB()
        return cls._instance
    
    @classmethod
    def listar_sessoes(cls):
        return cls.get_instance()._sessoes
    
    @classmethod
    def pegar_hash_por_nome(cls, nickname: str, lista: list):
        for usuario in lista:
            if usuario._nickname == nickname:
                return usuario._senha
        return "Falha"
    
    @classmethod
    def destruir_sessao(cls, nickname: str):
        cls.get_instance()._sessoes = [x for x in cls.get_instance()._sessoes if x._nickname != nickname]

    @classmethod
    def registrar_sessao(cls, nickname: str):
        cls.get_instance().destruir_sessao(nickname)

        expiracao = datetime.now()
        expiracao = expiracao + timedelta(minutes=30)

        chave = hashlib.md5((nickname + str(expiracao.timestamp())).encode('utf-8'))
        
        sessao : AutenticacaoSessao = AutenticacaoSessao(nickname, chave.hexdigest(), expiracao)
        cls.get_instance()._sessoes.append(sessao)

        return sessao._chave
    
    @classmethod
    def checar_chave_expiracao(cls, chave: str):
        sessoes = cls.get_instance().listar_sessoes()
        for sessao in sessoes:
            if(sessao._chave == chave and sessao._expiracao > datetime.now()):
                return True
        return False
    
    @classmethod
    def checar_chave_com_nome(cls, chave: str, nickname_usuario: str):
        sessoes = cls.get_instance().listar_sessoes()
        for sessao in sessoes:
            if(sessao._chave == chave and sessao._nickname == nickname_usuario):
                return True
        return False
    
    @classmethod
    def pegar_nickname_por_chave(cls, chave: str):
        sessoes = cls.get_instance().listar_sessoes()
        for sessao in sessoes:
            if(sessao._chave == chave):
                return sessao._nickname
        return "Falha"