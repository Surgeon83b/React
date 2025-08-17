import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className='flex'>
      <h3>Page not found</h3>
      <Image
        src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fvector%2Fsorry-page-not-found-404-error-emoticon-isolated-vector-illustration-gm1269703525-372937129&psig=AOvVaw28nREL_k6Jlc74OExhS47r&ust=1755515463778000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCICL2vjakY8DFQAAAAAdAAAAABAL'
        alt='Not found'
        fill
        priority
        style={{marginTop: '80px'}}
      />
    </div>
  );
}
