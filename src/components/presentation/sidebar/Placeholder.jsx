import { Logo } from "..";

export default function Placeholder() {
    const a = new Array(25).fill("");
    return (
        <>
            <Logo />
            <div className="h-12 bg-gray-300 blink"></div>
            <ul className="relative items-center text-blue-800 space-y-5 blink">
                {a.map((i, index) => (
                    <li key={index} className="h-3 w-full bg-gray-300"> bgy</li>
                ))}
            </ul>
        </>
    );
}
