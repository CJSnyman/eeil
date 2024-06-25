import { getAllItems } from "@/actions/getAllItems";
import { getRegionItems } from "@/actions/getRegionItems";
import { ListingGroup } from "@/types";
import groupByInitialLetter from "@/utils/groupByInitialLetter";

async function GroupItems({ region }: { region: string }) {
    let [data, errors]: [ListingGroup, string[]] =
        region.toLowerCase() === "all"
            ? groupByInitialLetter(await getAllItems())
            : groupByInitialLetter(await getRegionItems(region));

    return (
        <div>
            <section>
                {errors.map((error, errorsIndex) => (
                    <p key={errorsIndex}>{error}</p>
                ))}
            </section>
            <section>
                {Object.entries(data).map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <h2 className="text-3xl">{group[0]}</h2>
                        {group[1].map((listing) => {
                            const [listingName, listingType] = Object.entries(listing)[0];
                            return (
                                <div className="px-4 py-0.5 *:leading-tight">
                                    <p>{listingName}</p>
                                    <p className="text-gray-500 text-sm ps-3">{listingType}</p>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </section>
        </div>
    );
}

export default GroupItems;
