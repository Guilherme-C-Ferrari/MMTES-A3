
#Classe modelo de um capitulo.
class Capitulo():
    _id: int
    _numero: float
    _titulo: str
    _imagem: list[str]
    _obra_id: int
    _validado: bool

    def __init__(self, id: int, numero: float, titulo: str, imagem: list[str], obra_id: int,validado: bool = False):
        

        self._id = id
        self._numero = numero
        self._titulo = titulo
        self._imagem = imagem
        self._obra_id = obra_id
        self._validado = validado