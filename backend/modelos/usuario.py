# Classe modelo para o usuario.
class Usuario():

    _nome : str
    _email : str
    _senha : str
    _data_de_nascimento : str
    _bio : str
    _nickname : str

    def __init__(self, nome: str, email: str, senha: str, data_de_nascimento: str ,bio: str, nickname: str):
        self._nome = nome
        self._email = email
        self._senha = senha
        self._data_de_nascimento = data_de_nascimento
        self._bio = bio
        self._nickname = nickname
    
    def tipo(self):
        return "usuario"
    
    def get_nickname(self):
        return self._nickname
    
    def get_email(self):
        return self._email
    
    def verifica_senha(self, senha: str):
        return self._senha == senha

class Admin(Usuario):

    def __init__(self, nome: str, email: str, senha: str, data_de_nascimento: str, bio: str, nickname: str):
        super().__init__(nome, email, senha, data_de_nascimento, bio, nickname)

    def tipo(self) -> str:
        return "admin"