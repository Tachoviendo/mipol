"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  agregarComentario,
  agregarPublicacion,
  crearGrupo,
  esMiembroDe,
  obtenerGrupo,
  obtenerPublicacion,
  usuarioSimuladoDeRol,
} from "@/data/grupos";
import {
  puedeComentarEnGrupos,
  puedeCrearGrupos,
  puedeVerGrupos,
} from "@/lib/roles";
import { obtenerRolActual } from "@/lib/rol-actual";

export const LIMITE_NOMBRE_GRUPO = 60;
export const LIMITE_DESCRIPCION_GRUPO = 300;
export const LIMITE_CONTENIDO = 4000;

async function revalidarGrupo(grupoId: string) {
  revalidatePath("/grupos", "layout");
  revalidatePath(`/grupos/${grupoId}`, "layout");
}

export async function crearGrupoAction(formData: FormData) {
  const rolActual = await obtenerRolActual();
  if (!puedeCrearGrupos(rolActual)) {
    redirect("/grupos?error=rol");
  }

  const nombre = String(formData.get("nombre") ?? "").trim();
  const materia = String(formData.get("materia") ?? "").trim();
  const curso = String(formData.get("curso") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim();

  if (
    !nombre ||
    !materia ||
    !curso ||
    nombre.length > LIMITE_NOMBRE_GRUPO ||
    descripcion.length > LIMITE_DESCRIPCION_GRUPO
  ) {
    redirect("/grupos?error=formulario");
  }

  const grupo = crearGrupo({
    nombre,
    materia,
    curso,
    descripcion: descripcion || undefined,
    docenteId: usuarioSimuladoDeRol(rolActual),
  });

  revalidatePath("/grupos", "layout");
  redirect(`/grupos/${grupo.id}`);
}

export async function publicarEnGrupoAction(formData: FormData) {
  const grupoId = String(formData.get("grupoId") ?? "");
  const contenido = String(formData.get("contenido") ?? "").trim();

  const grupo = obtenerGrupo(grupoId);
  if (!grupo) {
    redirect("/grupos?error=grupo");
  }

  const rolActual = await obtenerRolActual();
  const usuarioId = usuarioSimuladoDeRol(rolActual);

  if (
    !puedeComentarEnGrupos(rolActual) ||
    !esMiembroDe(grupoId, usuarioId)
  ) {
    redirect(`/grupos/${grupoId}?error=rol`);
  }

  if (!contenido || contenido.length > LIMITE_CONTENIDO) {
    redirect(`/grupos/${grupoId}?error=formulario`);
  }

  agregarPublicacion({ grupoId, autorId: usuarioId, contenido });
  await revalidarGrupo(grupoId);
}

export async function comentarPublicacionAction(formData: FormData) {
  const grupoId = String(formData.get("grupoId") ?? "");
  const publicacionId = String(formData.get("publicacionId") ?? "");
  const contenido = String(formData.get("contenido") ?? "").trim();

  const grupo = obtenerGrupo(grupoId);
  const publicacion = obtenerPublicacion(publicacionId);
  if (!grupo || !publicacion || publicacion.grupoId !== grupoId) {
    redirect("/grupos?error=grupo");
  }

  const rolActual = await obtenerRolActual();
  const usuarioId = usuarioSimuladoDeRol(rolActual);

  if (
    !puedeComentarEnGrupos(rolActual) ||
    !esMiembroDe(grupoId, usuarioId)
  ) {
    redirect(`/grupos/${grupoId}?error=rol`);
  }

  if (!contenido || contenido.length > LIMITE_CONTENIDO) {
    redirect(`/grupos/${grupoId}?error=formulario`);
  }

  agregarComentario({ publicacionId, autorId: usuarioId, contenido });
  await revalidarGrupo(grupoId);
}