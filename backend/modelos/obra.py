#Classe modelo de uma obra.
class Obra():
    _id: int
    _titulo: str
    _descricao: str
    _autor: str
    _genero: str
    _capa: str
    #_capitulo: Capitulo()

    def __init__(self, id: int, titulo: str, descricao: str, autor: str, genero: str, capa: str):
        self._id = id
        self._titulo = titulo
        self._descricao = descricao
        self._autor = autor
        self._genero = genero
        self._capa = capa