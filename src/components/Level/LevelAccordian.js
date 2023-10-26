import Level from "./level";

export default function LeveLAccordians({ levelDetail }) {
    console.log(levelDetail);
    return (
        <>
            {
                levelDetail.map((element, index) => (
                    <Level key={index} unlocked={element} level={index} />
                ))
            }
        </>
    );
}
