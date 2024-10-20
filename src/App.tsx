import { useState } from "react";

import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { createBackendActor, useQueryCall } from "#/lib/actor";

const actor = createBackendActor();

function App() {
    const [helloWorld, setHelloWorld] = useState<string>("");

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (helloWorld === "Hello, elizielx!") {
            setHelloWorld("");
            return false;
        }

        const name = "elizielx";
        actor.greet(name).then((greeting) => {
            setHelloWorld(greeting);
        });

        return false;
    }

    const { call, data, loading, error } = useQueryCall({
        functionName: "greet",
        // @ts-expect-error Getting an undefined type for the args
        args: ["elizielx"],
        refetchOnMount: true,
        onLoading: () => console.log("Loading..."),
        onSuccess: (data) => console.log("Success!", data),
        onError: (error) => console.log("Error!", error),
    });

    return (
        <div>
            <div className="max-w-md p-8">
                <h1 className="pb-4">Internet Computer with React + rspack/rsbuild</h1>
                <Card>
                    <CardContent className="mb-12 mt-12 flex flex-col items-center justify-center gap-4 pt-6">
                        <span className="text-center">
                            {helloWorld ? <span>{helloWorld}</span> : <span>No greeting yet</span>}
                        </span>
                        <Button type="button" onClick={handleSubmit}>
                            Greet me
                        </Button>
                        <div className="mt-6 flex flex-col gap-4">
                            <Button type="button" onClick={call} disabled={loading}>
                                {loading ? "Loading..." : "Refresh"}
                            </Button>
                            {loading && <p>Loading...</p>}
                            {data && <p>{data}</p>}
                            {error && <p>Error: {error.message}</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default App;
