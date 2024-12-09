import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Search from "../(home)/_components/search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BabershopPageProps {
    searchParams: {
        search?: string
    }
}

const BabershopPage = async ({ searchParams }: BabershopPageProps) => {
    if (!searchParams.search) {
        redirect("/");
    }

    const babershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: 'insensitive'
            }
        }
    });

    return (
        <>
            <Header />
            <div className="px-5 py-6 flex flex-col gap-6">
                <Search defaultValues={{ search: searchParams.search }} />

                <h1 className="text-gray-400 font-bold text-xs uppercase">Resultados para &quot;{searchParams.search}&quot;</h1>

                <div className="grid grid-cols-2 gap-4">
                    {babershops.map(babershop => (
                        <div className="w-full" key={babershop.id}>
                            <BarbershopItem barbershop={babershop} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default BabershopPage;