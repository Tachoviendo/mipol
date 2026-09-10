"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  LIMITE_MENSAJE,
  LIMITE_TITULO,
  agregarMensaje,
  alternarCerrado,
  alternarFijado,
  crearHilo,
  eliminarHilo,
  eliminarMensaje,
  obtenerCategoriaForo,
  obtenerHiloForo,
} from "@/data/foros";
import {
  AUTOR_SIMULADO,
  NOMBRE_COOKIE,
  NOMBRE_MAX_LENGTH,
  ROL_COOKIE,
  esRolValido,
  puedeModerarForos,
  puedeParticiparEnForos,
} from "@/lib/roles";
import { obtenerNombreMostrado, obtenerRolActual } from "@/lib/rol-actual";

export async function establecerRolAction(formData: FormData) {
  const valorRol = formData.get("rol");
  const valorNombre = formData.get("nombre");
  const store = await cookies();
  const opcionesCookie = {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: "lax" as const,
  };

  if (typeof valorRol === "string" && esRolValido(valorRol)) {
    store.set(ROL_COOKIE, valorRol, opcionesCookie);
  }

  if (typeof valorNombre === "string") {
    const nombre = valorNombre.trim().slice(0, NOMBRE_MAX_LENGTH);
    if (nombre) {
      store.set(NOMBRE_COOKIE, nombre, opcionesCookie);
    } else {
      store.delete(NOMBRE_COOKIE);
    }
  }

  revalidatePath("/foros", "layout");
}

export async function crearHiloAction(formData: FormData) {
  const categoriaId = String(formData.get("categoriaId") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const mensajeInicial = String(formData.get("mensajeInicial") ?? "").trim();

  const categoria = obtenerCategoriaForo(categoriaId);
  if (!categoria) {
    redirect("/foros?error=formulario");
  }

  const rolActual = await obtenerRolActual();
  if (!puedeParticiparEnForos(rolActual)) {
    redirect(`/foros/${categoriaId}?error=rol`);
  }

  if (!titulo || !mensajeInicial) {
    redirect(`/foros/${categoriaId}?error=formulario`);
  }

  if (titulo.length > LIMITE_TITULO || mensajeInicial.length > LIMITE_MENSAJE) {
    redirect(`/foros/${categoriaId}?error=longitud`);
  }

  const nombre = await obtenerNombreMostrado();
  const hilo = crearHilo({
    categoriaId,
    titulo,
    autor: nombre || AUTOR_SIMULADO[rolActual],
    mensajeInicial,
  });

  revalidatePath(`/foros/${categoriaId}`);
  revalidatePath("/foros");
  redirect(`/foros/${categoriaId}/${hilo.id}`);
}

export async function responderHiloAction(formData: FormData) {
  const categoriaId = String(formData.get("categoriaId") ?? "");
  const hiloId = String(formData.get("hiloId") ?? "");
  const contenido = String(formData.get("contenido") ?? "").trim();

  const hilo = obtenerHiloForo(hiloId);
  if (!hilo) {
    revalidatePath(`/foros/${categoriaId}`);
    return;
  }

  const rolActual = await obtenerRolActual();

  if (hilo.cerrado) {
    redirect(`/foros/${categoriaId}/${hiloId}?error=cerrado`);
  }
  if (!puedeParticiparEnForos(rolActual)) {
    redirect(`/foros/${categoriaId}/${hiloId}?error=rol`);
  }
  if (!contenido) {
    redirect(`/foros/${categoriaId}/${hiloId}?error=formulario`);
  }
  if (contenido.length > LIMITE_MENSAJE) {
    redirect(`/foros/${categoriaId}/${hiloId}?error=longitud`);
  }

  const nombre = await obtenerNombreMostrado();
  agregarMensaje({ hiloId, autor: nombre || AUTOR_SIMULADO[rolActual], contenido });

  revalidatePath(`/foros/${categoriaId}/${hiloId}`);
  revalidatePath(`/foros/${categoriaId}`);
}

async function esModeradorActual() {
  const rolActual = await obtenerRolActual();
  return puedeModerarForos(rolActual);
}

export async function alternarFijadoAction(formData: FormData) {
  const categoriaId = String(formData.get("categoriaId") ?? "");
  const hiloId = String(formData.get("hiloId") ?? "");

  if (await esModeradorActual()) {
    alternarFijado(hiloId);
  }

  revalidatePath(`/foros/${categoriaId}`);
  revalidatePath(`/foros/${categoriaId}/${hiloId}`);
}

export async function alternarCerradoAction(formData: FormData) {
  const categoriaId = String(formData.get("categoriaId") ?? "");
  const hiloId = String(formData.get("hiloId") ?? "");

  if (await esModeradorActual()) {
    alternarCerrado(hiloId);
  }

  revalidatePath(`/foros/${categoriaId}`);
  revalidatePath(`/foros/${categoriaId}/${hiloId}`);
}

export async function eliminarHiloAction(formData: FormData) {
  const categoriaId = String(formData.get("categoriaId") ?? "");
  const hiloId = String(formData.get("hiloId") ?? "");

  if (await esModeradorActual()) {
    eliminarHilo(hiloId);
    revalidatePath(`/foros/${categoriaId}`);
    revalidatePath("/foros");
    redirect(`/foros/${categoriaId}`);
  }

  revalidatePath(`/foros/${categoriaId}/${hiloId}`);
}

export async function eliminarMensajeAction(formData: FormData) {
  const categoriaId = String(formData.get("categoriaId") ?? "");
  const hiloId = String(formData.get("hiloId") ?? "");
  const mensajeId = String(formData.get("mensajeId") ?? "");

  if (await esModeradorActual()) {
    eliminarMensaje(mensajeId);
  }

  revalidatePath(`/foros/${categoriaId}/${hiloId}`);
}
