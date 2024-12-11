export function checkProvider(provider: string, id: string) {
  switch (provider) {
    case "youtube":
      return (
        <iframe
          width="100%"
          height="100%"
          className="aspect-video"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder={0}
        ></iframe>
      );
    case "vimeo":
      return <video src={`https://vimeo.com/${id}`}></video>;
    default:
      return null;
  }
}
