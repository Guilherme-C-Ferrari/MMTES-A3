from backend.persistencia.autenticacao_db import AutenticacaoDB
from backend.persistencia.obra_db import ObraDB
from backend.modelos.obra import Obra

# Controlador da obra.
class ObraControlador:

    @classmethod
    def pegar_lista_de_obras(cls):
        return ObraDB.get_instance().listar_todas_as_obras()

    @classmethod
    def filtrar_lista_de_obras(cls):
        obras = cls.pegar_lista_de_obras()
        
        obras_dto = []
        for obra in obras:
            if getattr(obra, "_validada", False):  # Só adiciona se validada
                obras_dto.append({
                    "id": obra._id,
                    "titulo" : obra._titulo,
                    "descricao" : obra._descricao,
                    "autor" : obra._autor,
                    "genero" : obra._genero,
                    "capa" : obra._capa
                })

        lista_filtrada : [] = obras_dto

        return lista_filtrada
    
    @classmethod
    def listar_todas_as_obras(cls):
        return cls.filtrar_lista_de_obras()
    
    @classmethod
    def adicionar_obra(cls, titulo: str, descricao: str, genero: str, capa: str, chave: str):
        autor = AutenticacaoDB.get_instance().pegar_nickname_por_chave(chave)
        if autor is None:
            raise Exception("Autor não encontrado")        
        j : Obra = Obra(0,titulo, descricao, autor, genero, capa, False)
        ObraDB.get_instance().inserir_obra_no_banco(j)
    
    @classmethod
    def editar_obra_por_id(cls, id: int, titulo: str, descricao: str, genero: str, capa: str):
        ObraDB.get_instance().editar_obra_no_banco_por_id(id, titulo, descricao, genero, capa)
    
    @classmethod
    def remover_obra_por_id(cls, id: int):
        ObraDB.get_instance().remover_obra_do_banco_por_id(id)

    #========================= Obra Validacao

    @classmethod
    def listar_obras_pendentes(cls):
        return [obra for obra in ObraDB.get_instance().listar_todas_as_obras() if not getattr(obra, "_validada", False)]
    
    @classmethod
    def validar_obra(cls, id: int):
        lista = ObraDB.get_instance().listar_todas_as_obras()
        for obra in lista:
            if obra._id == id:
                obra._validada = True
                ObraDB.get_instance().editar_obra_no_banco_por_id(obra._id, obra._titulo, obra._descricao, obra._genero, 
                obra._capa, True )
                return True
        return False