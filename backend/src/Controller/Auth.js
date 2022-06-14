import { DbConfig } from '../Config/db.config';
import { compare } from 'bcrypt';

export class AuthController {
    async create(request, response) {
        const pool = new DbConfig().getPool();

        const { Title, Author, Issue, Date, State } = request.body;

        if (!Title || !Author || !Issue || !Date || !State) {
            return response
            .status(400)
            .json({ msg: 'All fields are rquired to create' });
        }

        try {
            const pgClient = await pool.connect();

            const query = {
                text: "INSERT INTO Books (Title, Author, Issue, Date, State) VALUES ($1, $2, $3, $4, $5)",
                values: [Title, Author, Issue, Date, State],
            };


            await pgClient.query(query);
            pgClient.release();

            return response.status(201).json({ msg: 'Created' });
        } catch (error) {
            return response.status(500).json(error);
        }

    }

    async getData(request, response) {
        
        const pool = new DbConfig().getPool();

        try {
            const pgClient = await pool.connect();

            let query = {
                text: "SELECT * FROM Books"
            };

            let Data = await (await pgClient.query(query)).rows;
            pgClient.release();

            return response.status(201).json({ Data })
        } catch (error) {
            return response
            .status(500)
            .json(error);
        }
    };

    async update(request, response) {
        const pool = new DbConfig().getPool();

        const id = request.params.id;
        const { Title, Author, Issue, Date, State } = request.body;

        try {

            const pgClient = await pool.connect();

            if (Title) {
                let titleQuery = {
                    text: "UPDATE Books SET Title = $1 WHERE id = $2",
                    values: [Title, id]
                }
                await pgClient.query(titleQuery);
            }

            if (Author) {
                let authorQuery = {
                    text: "UPDATE Books SET Author = $1 WHERE id = $2",
                    values: [Author, id]
                }
                await pgClient.query(authorQuery);
            } 

            if (Issue) {
                let issueQuery = {
                    text: "UPDATE Books SET Issue = $1 WHERE id = $2",
                    values: [Issue, id]
                }
                await pgClient.query(issueQuery);
            }

            if (Date) {
                let dateQuery = {
                    text: "UPDATE Books SET Date = $1 WHERE id = $2",
                    values: [Date, id]
                }
                await pgClient.query(dateQuery);   
            }

            if (State) {
                let stateQuery = {
                    text: "UPDATE Books SET State = $1 WHERE id = $2",
                    values: [State, id]
                }
                await pgClient.query(stateQuery);
            }

            pgClient.release();
            return response
            .status(201)
            .json({ msg: 'Credientials updated'});

        } catch (error) {
            return response
            .status(500)
            .json(error)
        }
    };

    async delete(request, response) {

        const id = request.params.id;

        const pool = new DbConfig().getPool();

        try {
            
            const pgClient = await pool.connect();

            let query = {
                text: "DELETE FROM Books WHERE id = $1",
                values: [id]
            };

            await pgClient.query(query);

            pgClient.release();
            return response
            .status(201)
            .json({ msg: 'Book deleted' })

        } catch (error) {
            return response
            .status(500)
            .json(error)
        }
    };
}


