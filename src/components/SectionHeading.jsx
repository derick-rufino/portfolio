// src/components/SectionHeading.jsx
export default function SectionHeading({ title, children }) {
  return (
    <div>
      <h2 className="text-3xl font-medium text-foreground">{title}</h2>
      {children && (
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          {children}
        </p>
      )}
    </div>
  );
}
