import Card from './components/Card';

export default function Teams() {
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-10">
            <h1 className="mb-6 text-3xl font-bold text-white">Team Directory</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card
                    name="Aarav Sharma"
                    role="Core Member"
                    department="CSE"
                    semester="Semester 5"
                    domain="Web Development"
                    memberId="PES1UG23CS001"
                    bio="Passionate full-stack developer interested in building scalable web apps, high-performance APIs, and interactive UI animations."
                />
                <Card
                    name="Sakshi"
                    role="Core Member"
                    department="AIML"
                    semester="Semester 7"
                    domain="Web Development"
                    memberId="PES1UG23CS0441"
                    bio="Passionate full-stack developer interested in building scalable web apps, high-performance APIs, and interactive UI animations."
                />
            </div>
        </section>
    );
}

