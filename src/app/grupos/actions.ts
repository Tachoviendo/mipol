"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  agregarPublicacion,
  calificarEntrega,
  crearGrupo,
  crearTarea,
  entregarTarea,
  esMiembroDe,
  obtenerGrupo,
  obtenerTarea,
  unirseAGrupo,
  usuarioSimuladoDeRol,
} from "@/data/grupos";
import {
  puedeAdministrarGrupos,
  puedeCrearGrupos,
  puedeParticiparEnGrupos,
} from "@/lib/roles";
import { obtenerRolActual } from "@/lib/rol-actual";

export const LIMITE_NOMBRE_GRUPO = 60;
export const LIMITE_DESCRIPCION_GRUPO = 300;
export const LIMITE_TITULO_TAREA = 100;
export const LIMITE_DESCRIPCION_TAREA = 1000;
export const LIMITE_COMENTARIO = 1000;
export const LIMITE_CONTENIDO_PUBLICACION = 4000;

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

  if (!puedeParticiparEnGrupos(rolActual) || !esMiembroDe(grupoId, usuarioId)) {
    redirect(`/grupos/${grupoId}?error=rol`);
  }

  if (!contenido || contenido.length > LIMITE_CONTENIDO_PUBLICACION) {
    redirect(`/grupos/${grupoId}?error=formulario`);
  }

  agregarPublicacion({ grupoId, autorId: usuarioId, contenido });
  await revalidarGrupo(grupoId);
}

export async function crearTareaAction(formData: FormData) {
  const grupoId = String(formData.get("grupoId") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const fechaEntrega = String(formData.get("fechaEntrega") ?? "");

  const grupo = obtenerGrupo(grupoId);
  if (!grupo) {
    redirect("/grupos?error=grupo");
  }

  const rolActual = await obtenerRolActual();
  const usuarioId = usuarioSimuladoDeRol(rolActual);

  if (!puedeAdministrarGrupos(rolActual)) {
    redirect(`/grupos/${grupoId}?error=rol`);
  }

  if (
    !titulo ||
    !fechaEntrega ||
    titulo.length > LIMITE_TITULO_TAREA ||
    descripcion.length > LIMITE_DESCRIPCION_TAREA
  ) {
    redirect(`/grupos/${grupoId}?error=formulario`);
  }

  crearTarea({ grupoId, titulo, descripcion, fechaEntrega, publicadoPorId: usuarioId });
  await revalidarGrupo(grupoId);
}

export async function entregarTareaAction(formData: FormData) {
  const tareaId = String(formData.get("tareaId") ?? "");

  const tarea = obtenerTarea(tareaId);
  if (!tarea) {
    redirect("/grupos?error=tarea");
  }

  const rolActual = await obtenerRolActual();
  const usuarioId = usuarioSimuladoDeRol(rolActual);

  if (rolActual !== "estudiante" || !esMiembroDe(tarea.grupoId, usuarioId)) {
    redirect(`/grupos/${tarea.grupoId}?error=rol`);
  }

  entregarTarea({ tareaId, estudianteId: usuarioId });
  await revalidarGrupo(tarea.grupoId);
}

export async function calificarEntregaAction(formData: FormData) {
  const grupoId = String(formData.get("grupoId") ?? "");
  const entregaId = String(formData.get("entregaId") ?? "");
  const nota = Number(formData.get("nota"));
  const comentario = String(formData.get("comentario") ?? "").trim();

  const rolActual = await obtenerRolActual();
  if (!puedeAdministrarGrupos(rolActual)) {
    redirect(`/grupos/${grupoId}?error=rol`);
  }

  if (!Number.isFinite(nota) || nota < 1 || nota > 10 || comentario.length > LIMITE_COMENTARIO) {
    redirect(`/grupos/${grupoId}?error=formulario`);
  }

  calificarEntrega({ entregaId, nota, comentario: comentario || undefined });
  await revalidarGrupo(grupoId);
}

export async function unirseAGrupoAction(formData: FormData) {
  const grupoId = String(formData.get("grupoId") ?? "");

  const grupo = obtenerGrupo(grupoId);
  if (!grupo) {
    redirect("/grupos?error=grupo");
  }

  const rolActual = await obtenerRolActual();
  const usuarioId = usuarioSimuladoDeRol(rolActual);

  if (rolActual !== "estudiante") {
    redirect(`/grupos/${grupoId}?error=rol`);
  }

  unirseAGrupo(grupoId, usuarioId);
  await revalidarGrupo(grupoId);
}