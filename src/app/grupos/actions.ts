"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { obtenerGrupo } from "@/data/grupos";
import {
  agregarComentario,
  agregarPublicacion,
  crearGrupo,
  esMiembroDe,
  obtenerPublicacion,
  usuarioSimuladoDeRol,
} from "@/data/grupos";
import { obtenerRolActual } from "@/lib/rol-actual";
import {
  puedeComentarEnGrupos,
  puedeCrearGrupos,
  puedeVerGrupos,
} from "@/lib/roles";

export const LIMITE_NOMBRE_GRUPO = 60;
export const LIMITE_DESCRIPCION_GRUPO = 300;
export const LIMITE_CONTENIDO = 4000;

export async function crearGrupoAction(formData: FormData) {
  const rolActual = await obtenerRolActual();
  if (!puedeCrearGrupos(rolActual)) {
    throw new Error("No tenés permiso para crear grupos.");
  }

  const nombre = formData.get("nombre")?.toString().trim() ?? "";
  const materia = formData.get("materia")?.toString().trim() ?? "";
  const curso = formData.get("curso")?.toString().trim() ?? "";
  const descripcion = formData.get("descripcion")?.toString().trim() ?? "";

  if (
    !nombre ||
    !materia ||
    !curso ||
    nombre.length > LIMITE_NOMBRE_GRUPO ||
    descripcion.length > LIMITE_DESCRIPCION_GRUPO
  ) {
    redirect("/grupos?error=datos-invalidos");
  }

  crearGrupo({
    nombre: nombre.slice(0, LIMITE_NOMBRE_GRUPO),
    materia: materia.slice(0, 60),
    curso: curso.slice(0, 30),
    descripcion: descripcion.slice(0, LIMITE_DESCRIPCION_GRUPO),
    docenteId: usuarioSimuladoDeRol(rolActual),
  });

  revalidatePath("/grupos");
  redirect("/grupos");
}

export async function publicarEnGrupoAction(formData: FormData) {
  const rolActual = await obtenerRolActual();
  if (!puedeCrearGrupos(rolActual)) {
    throw new Error("No tenés permiso para publicar.");
  }

  const grupoId = formData.get("grupoId")?.toString() ?? "";
  const contenido = formData.get("contenido")?.toString().trim() ?? "";
  const grupo = obtenerGrupo(grupoId);
  if (!grupo || !contenido || contenido.length > LIMITE_CONTENIDO) {
    redirect(`/grupos/${grupoId}?error=datos-invalidos`);
  }
  if (!esMiembroDe(grupoId, usuarioSimuladoDeRol(rolActual))) {
    redirect(`/grupos/${grupoId}?error=sin-permiso`);
  }

  agregarPublicacion({
    grupoId,
    autorId: usuarioSimuladoDeRol(rolActual),
    contenido: contenido.slice(0, LIMITE_CONTENIDO),
  });

  revalidatePath(`/grupos/${grupoId}`);
  redirect(`/grupos/${grupoId}`);
}

export async function comentarPublicacionAction(formData: FormData) {
  const rolActual = await obtenerRolActual();
  if (!puedeComentarEnGrupos(rolActual)) {
    throw new Error("No tenés permiso para comentar.");
  }

  const grupoId = formData.get("grupoId")?.toString() ?? "";
  const publicacionId = formData.get("publicacionId")?.toString() ?? "";
  const contenido = formData.get("contenido")?.toString().trim() ?? "";
  const publicacion = obtenerPublicacion(publicacionId);

  if (
    !publicacion ||
    publicacion.grupoId !== grupoId ||
    !contenido ||
    contenido.length > LIMITE_CONTENIDO
  ) {
    redirect(`/grupos/${grupoId}?error=datos-invalidos`);
  }
  if (!puedeVerGrupos(rolActual)) {
    redirect(`/grupos/${grupoId}?error=sin-permiso`);
  }

  agregarComentario({
    publicacionId,
    autorId: usuarioSimuladoDeRol(rolActual),
    contenido: contenido.slice(0, LIMITE_CONTENIDO),
  });

  revalidatePath(`/grupos/${grupoId}`);
  redirect(`/grupos/${grupoId}`);
}