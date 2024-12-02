import { sql } from 'drizzle-orm';
import { int, sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    age: int().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    roleId: int().notNull().references(() => rolesTable.id),
    createdAt: integer('created_at', { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`), 
    updateAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});

export const rolesTable = sqliteTable("roles", {
    id: int().primaryKey({ autoIncrement: true }),
    roleName: text().notNull().unique(), // Ej: 'coach', 'athlete'
    createdAt: integer('created_at', { mode: "timestamp_ms" }).notNull().default(sql`CURRENT_TIMESTAMP`), 
    updateAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});

export const workoutsTable = sqliteTable("workouts", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(), // Ej: "Entrenamiento de fuerza"
    description: text(), // Descripción del entrenamiento
    date: text().notNull(), // Fecha de realización
    coachId: int().notNull().references(() => usersTable.id), // Relación con el coach
    athleteId: int().notNull().references(() => usersTable.id), // Relación con el atleta
    createdAt: integer('created_at', { mode: "timestamp_ms" }).notNull().default(sql`CURRENT_TIMESTAMP`), 
    updateAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});

export const exercisesTable = sqliteTable("exercises", {
    id: int().primaryKey({ autoIncrement: true }),
    workoutId: int().notNull().references(() => workoutsTable.id), // Relación con el entrenamiento
    name: text().notNull(), // Nombre del ejercicio
    sets: int().notNull(), // Número de series
    reps: int().notNull(), // Número de repeticiones
    rest: int(), // Descanso entre series (en segundos)
    createdAt: integer('created_at', { mode: "timestamp_ms" }).notNull().default(sql`CURRENT_TIMESTAMP`), 
    updateAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});

export const progressTable = sqliteTable("progress", {
    id: int().primaryKey({ autoIncrement: true }),
    athleteId: int().notNull().references(() => usersTable.id), // Relación con el atleta
    workoutId: int().references(() => workoutsTable.id), // Relación opcional con un entrenamiento
    date: text().notNull(), // Fecha de registro
    notes: text(), // Notas del progreso
    completed: int().notNull(), // Ej: 1 para completado, 0 para no completado
    createdAt: integer('created_at', { mode: "timestamp_ms" }).notNull().default(sql`CURRENT_TIMESTAMP`), 
    updateAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});

export const messagesTable = sqliteTable("messages", {
    id: int().primaryKey({ autoIncrement: true }),
    senderId: int().notNull().references(() => usersTable.id), // Usuario que envía el mensaje
    receiverId: int().notNull().references(() => usersTable.id), // Usuario que recibe el mensaje
    content: text().notNull(), // Contenido del mensaje
    sentAt: text().notNull(), // Fecha y hora de envío
    read: int().notNull().default(0), // Ej: 1 para leído, 0 para no leído
    createdAt: integer('created_at', { mode: "timestamp_ms" }).notNull().default(sql`CURRENT_TIMESTAMP`), 
    updateAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});

export const sessionsTable = sqliteTable("sessions", {
    id: int().primaryKey({ autoIncrement: true }),
    userId: int().notNull().references(() => usersTable.id), // Relación con el usuario
    token: text().notNull(), // Token de sesión/ Fecha y hora de creación
    expiresAt: text().notNull(), // Fecha y hora de expiración
    createdAt: integer('created_at', { mode: "timestamp_ms" }).notNull().default(sql`CURRENT_TIMESTAMP`), 
    updateAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});
