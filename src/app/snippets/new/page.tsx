import {redirect} from "next/navigation";
import {db} from "@/db";

export default function SnippetCreatePage() {

    async function createSnippet(formData: FormData) {

        // this needs to be a server action!
        "use server";

        //check the user's inputs and make sure they're valid
        const title = formData.get("title") as string; // cuz name property in the input
        const code = formData.get("code") as string;

        // create a new record in the database
        const snippet = await db.snippet.create({
            data: {
                title,
                code
            }
        });

        console.log(snippet);

        // redirect the user back to the root route
        redirect("/");
    }

    return(
        <form action={createSnippet}>
            <h3 className="font-bold m-3">Create a snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">Title</label>
                    <input name="title" className="border rounded p-2 w-full" id="title" />
                </div>

                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">Code</label>
                    <textarea name="code" className="border rounded p-2 w-full" id="code" />
                </div>

                <button className="rounded p-2 bg-blue-200" type="submit">Create</button>
            </div>

            

            
        </form>
    )
}