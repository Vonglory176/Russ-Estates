import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiUrl } from "@/utils/get-strapi-url";

const BASE_URL = getStrapiUrl();
const BLOG_PAGE_SIZE = 2;

const homePageQuery = qs.stringify({
  populate: {
    seo: {
      populate: {
        openGraphImage: {
          fields: ["url", "alternativeText"],
        },
      },
    },
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            logo: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
            cta: true,
            contactForm: {
              populate: {
                fields: {
                  populate: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    company: true,
                    jobTitle: true,
                    propertyAddress: true,
                    message: true,
                  }
                }
              }
            }
          },
        },
        "blocks.services-section": {
          populate: {
            backgroundImage: {
              fields: ["url", "alternativeText"],
            },
            services: {
              populate: {
                // icon: {
                //   fields: ["url", "alternativeText"],
                // },
                icon: true,
                link: true,
              },
            },
            cta: true,
          },
        },
        "blocks.senja-widget": {
          populate: true,
        },
        "blocks.info-block": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            cta: true,
          },
        },
        "blocks.form-section": {
          // populate: true,
          populate: {
            contactForm: {
              populate: {
                fields: {
                  populate: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    company: true,
                    jobTitle: true,
                    propertyAddress: true,
                    message: true,
                  }
                }
              }
            },
            sideImage: {
              fields: ["url", "alternativeText"],
            },
            backgroundImage: {
              fields: ["url", "alternativeText"],
            },
          }
        },
      },
    },
  },
});

// Loads the home page
export async function getHomePage() {
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);

  url.search = homePageQuery;

  return fetchAPI(url.href, { method: "GET" });
}

// Loads a page by slug
const pageBySlugQuery = (slug: string) =>
  qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      seo: {
        populate: {
          openGraphImage: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              logo: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
              cta: true,
              contactForm: {
                populate: {
                  fields: {
                    populate: {
                      firstName: true,
                      lastName: true,
                      email: true,
                      phone: true,
                      company: true,
                      jobTitle: true,
                      propertyAddress: true,
                      message: true,
                    }
                  }
                }
              }
            },
          },
          "blocks.info-block": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
          "blocks.featured-article": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              link: true,
            },
          },
          "blocks.subscribe": {
            populate: true,
          },
          "blocks.services-section": {
            populate: {
              services: {
                populate: {
                  logo: {
                    fields: ["url", "alternativeText"],
                  },
                  link: true,
                },
              },
            },
          },
        },
      },
    },
  });

export async function getPageBySlug(slug: string) {
  const path = "/api/pages";
  const url = new URL(path, BASE_URL);

  url.search = pageBySlugQuery(slug);
  return await fetchAPI(url.href, { method: "GET" });
}

// Loads the global settings (Layout)
const globalSettingQuery = qs.stringify({
  populate: {
    seo: {
      populate: {
        openGraphImage: {
          fields: ["url", "alternativeText"],
        },
      },
    },
    header: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: true,
        cta: true,
      },
    },
    footer: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: true,
        policies: true,
      },
    },
  },
});

export async function getGlobalSettings() {
  const path = "/api/global";
  const BASE_URL = getStrapiUrl();

  const url = new URL(path, BASE_URL);

  url.search = globalSettingQuery;
  return fetchAPI(url.href, { method: "GET" });
}

// Content Loader - Used for bits like Featured Articles
export async function getContent(path: string, featured?: boolean, query?: string, page?: string) {
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    sort: ["createdAt:desc"],
    filters: {
      $or: [
        { title: { $containsi: query } },
        { description: { $containsi: query } },
      ],
      ...( featured && { featured: { $eq: featured } }),
    },
    pagination: {
      pageSize: BLOG_PAGE_SIZE,
      page: parseInt(page || "1"),
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });

  return fetchAPI(url.href, { method: "GET" });
}

// Blog Populate
const blogPopulate = {
  blocks: {
    on: {
      "blocks.hero-section": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          cta: true,
        },
      },
      "blocks.info-block": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          cta: true,
        },
      },
      "blocks.featured-article": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: true,
        },
      },
      "blocks.subscribe": {
        populate: true,
      },
      "blocks.heading": {
        populate: true,
      },
      "blocks.paragraph-with-image": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      "blocks.paragraph": {
        populate: true,
      },
      "blocks.full-image": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  },
};

export async function getContentBySlug(slug: string, path: string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
      ...blogPopulate,
    },
  });

  return fetchAPI(url.href, { method: "GET" });
}