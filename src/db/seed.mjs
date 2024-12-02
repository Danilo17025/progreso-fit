import db from './database.js';
import { eq } from 'drizzle-orm';
import { rolesTable, usersTable } from './schema.js';


const seed = async () => {
    await db.transaction(async (trx)=>{
        const found = await trx.select().from(rolesTable).where(eq(rolesTable.roleName, 'admin'));
        if (found.length === 0) {
            await trx.insert(rolesTable).values({ roleName: 'admin' });
        }
    });

    await db.transaction(async (trx)=>{
        const foundUser = await trx.select().from(usersTable).where(eq(usersTable.email, 'admin@gmail.com'));
        const foundRole = await trx.select().from(rolesTable).where(eq(rolesTable.roleName, 'admin'));

        if (foundRole.length === 0) {
            console.error('No se encontró el rol de admin');
            return;
        }

        if (foundUser.length === 0) {
            await trx.insert(usersTable).values({ 
                name: 'Admin',
                age: 30,
                email: 'admin@gmail.com',
                password: '12345678',
                roleId: foundRole[0].id
            });
        }
    });
};

seed();