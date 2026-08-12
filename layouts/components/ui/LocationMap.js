import site from "@config/site.json";

/**
 * Embedded Google Map for the office.
 *
 * Uses the keyless /maps?output=embed endpoint, so there is no API key to
 * manage or leak.
 *
 * Two deliberate choices:
 *  - loading="lazy" so the map (a heavy third-party frame) never blocks the
 *    page or counts against LCP.
 *  - a real <iframe title>, because an untitled frame is an unlabelled landmark
 *    to a screen reader. A text address and a "get directions" link sit
 *    alongside it so the information is never trapped inside the map.
 *
 * Note: Google sets cookies when this frame loads. That is covered in the
 * cookie policy and is why the map is not embedded on every page.
 */
const LocationMap = ({ className = "", height = "380" }) => {
  const q = encodeURIComponent(site.business.map_embed_query);
  const src = `https://www.google.com/maps?q=${q}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-card border border-border shadow-card">
        <iframe
          title={`Map showing ${site.business.trading_name}, ${site.business.address.full}`}
          src={src}
          width="100%"
          height={height}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, display: "block" }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <address className="not-italic leading-relaxed text-textMuted">
          {site.business.address.full}
        </address>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-semibold text-primary-700 underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          Get directions
          <span className="sr-only"> (opens Google Maps in a new tab)</span>
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
