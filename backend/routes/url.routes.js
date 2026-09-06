import express from "express"
import { shortenPostRequestSchema } from "../validations/req.validation.js"
import { db } from "../db/index.js"
import { urlsTable } from "../models/index.js"
import { nanoid } from "nanoid"
import { ensureAuthenticated } from '../middlewares/auth.middleware.js'
import { and, eq } from "drizzle-orm"

const router = express.Router();

//generating short URL =>
router.post("/shorten", ensureAuthenticated, async (req, res) => {

    const validationResult =
        await shortenPostRequestSchema.safeParseAsync(req.body);

    if (validationResult.error) {
        return res.status(400).json({
            error: validationResult.error
        });
    }

    const { url, code } = validationResult.data;

    const shortCode = code ?? nanoid(6);

    try {

        const [result] = await db
            .insert(urlsTable)
            .values({
                shortCode,
                targetURL: url,
                userId: req.user.id,
            })
            .returning({
                id: urlsTable.id,
                shortCode: urlsTable.shortCode,
                targetURL: urlsTable.targetURL
            });

        return res.status(201).json({
            id: result.id,
            shortcode: result.shortCode,
            targetURL: result.targetURL
        });

    } catch (error) {

        if (error.cause?.code === "23505") {  //agar cause exist karta hai tabhi .code check karo.
            return res.status(409).json({
                error: "This short code is already taken"
            });
        }

        console.log("SHORTEN ERROR:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

//get all urls =>
router.get("/codes", ensureAuthenticated, async (req, res) => {
    const codes = await db
        .select()
        .from(urlsTable)
        .where(eq(urlsTable.userId, req.user.id));

    return res.json({ codes });
})

//delete sortcode =>
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    const id = req.params.id;
    const result = await db
        .delete(urlsTable)
        .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)))


    return res.status(200).json({ deleted: true })

});

//getting URl
router.get("/:shortCode", async (req, res) => {
    const code = req.params.shortCode;
    const [result] = await db
        .select({ targetURL: urlsTable.targetURL })
        .from(urlsTable)
        .where(eq(urlsTable.shortCode, code));

    if (!result) return res.status(404).json({ error: "Invalid url" })

    return res.redirect(result.targetURL)  //you can use this short url..
});


export default router;