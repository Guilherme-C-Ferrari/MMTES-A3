from backend.controladores.autenticacao_controlador import AutenticacaoControlador
from backend.persistencia.capitulo_db import CapituloDB
from backend.persistencia.obra_db import ObraDB
from backend.modelos.capitulo import Capitulo

class CapituloControlador:

    @classmethod
    def pegar_lista_de_capitulos(cls):
        return ObraDB.get_instance().listar_todos_os_capitulos()

    @classmethod
    def filtrar_lista_de_capitulos(cls):
        capitulos = cls.pegar_lista_de_capitulos()
        
        capitulos_dto = []
        for capitulo in capitulos:
            if getattr(capitulo, "_validado", False): 
                capitulos_dto.append({
                    "id": capitulo._id,
                    "numero": capitulo._numero,
                    "titulo": capitulo._titulo,
                    "imagem": capitulo._imagem,
                    "obra_id": capitulo._obra_id,
                })

        lista_filtrada = capitulos_dto

        return lista_filtrada

    
    @classmethod
    def listar_todos_os_capitulos(cls):
        return cls.filtrar_lista_de_capitulos()

    @classmethod
    def adicionar_capitulo(cls, numero: float, titulo: str, imagem: list[str], obra_id: int, token: str):
        if not AutenticacaoControlador.usuario_e_autor_da_obra(token, obra_id):
            raise Exception("Apenas o autor da obra pode adicionar capítulos")
        capitulo = Capitulo(0, numero, titulo, imagem, obra_id, False)
        CapituloDB.get_instance().inserir_capitulo_no_banco(capitulo)
        return {"message": "Capítulo adicionado"}
    
    @classmethod
    def editar_capitulo(cls, capitulo_id: int, numero: float, titulo: str, imagem: list[str], obra_id: int, token: str):
        if not AutenticacaoControlador.usuario_e_autor_da_obra(token, obra_id):
            raise Exception("Apenas o autor da obra pode editar capítulos")
        CapituloDB.get_instance().editar_capitulo_no_banco_por_id(capitulo_id, numero, titulo, imagem, obra_id)
    
    @classmethod
    def remover_capitulo(cls, capitulo_id: int, obra_id: int, token: str):
        if not AutenticacaoControlador.usuario_e_autor_da_obra(token, obra_id):
            raise Exception("Apenas o autor da obra pode remover capítulos")
        CapituloDB.get_instance().remover_capitulo_no_banco_por_id(capitulo_id)

    #========================= Capitulo Validacao

    @classmethod
    def listar_capitulos_pendentes(cls):
        return [cap for cap in CapituloDB.get_instance().listar_todos_os_capitulos() if not getattr(cap, "_validado", False)]
    
    @classmethod
    def validar_capitulo(cls, capitulo_id: int):
        lista = CapituloDB.get_instance().listar_todos_os_capitulos()
        for cap in lista:
            if cap._id == capitulo_id:
                cap._validado = True
                CapituloDB.get_instance().editar_capitulo_no_banco_por_id(
                    cap._id, cap._numero, cap._titulo, cap._imagem, cap._obra_id, True
                )
                return True
        return False