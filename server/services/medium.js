const fetch = require('node-fetch');
const medium = require('medium-sdk');
const cache = require('./../redis/cache');

const client = new medium.MediumClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
});

const cachedRes = '])}while(1);</x>{"success":true,"payload":{"user":{"userId":"c60270edd10f","name":"Manojkumar Muralidharan","username":"manoj.wolfpack","createdAt":1490822629014,"imageId":"1*cXNWh6zSRC8qcRaFA8ZyRg.jpeg","backgroundImageId":"","bio":"","twitterScreenName":"","facebookAccountId":"1086275298175983","allowNotes":1,"mediumMemberAt":1565593200000,"isNsfw":false,"isWriterProgramEnrolled":true,"isQuarantined":false,"isSuspended":false,"type":"User"},"streamItems":[{"createdAt":1569978902267,"heading":{"text":"Latest","heading":{"fallbackTitle":"Latest","headingBasic":{"title":"Latest"},"headingType":"headingBasic"}},"randomId":"cfc4b197bf24","itemType":"heading","type":"StreamItem"},{"createdAt":1569978902268,"postPreview":{"postId":"69db7513d3c7","postSuggestionReasons":[{"reason":28}]},"randomId":"ae7114a92d29","itemType":"postPreview","type":"StreamItem"}],"userMeta":{"numberOfPostsPublished":1,"userId":"c60270edd10f","userSuggestionReason":{"followeesWhoFollow":{"users":[]},"reason":"followeesWhoFollow"},"collectionIds":[],"authorTags":[],"featuredPostId":"69db7513d3c7","topWriterInTags":[],"type":"UserMeta"},"userNavItemList":{"userNavItems":[{"title":"Profile","url":"https://medium.com/@manoj.wolfpack","systemItem":{"systemType":1},"navType":"systemItem"},{"title":"Claps","url":"https://medium.com/@manoj.wolfpack/has-recommended","systemItem":{"systemType":4},"navType":"systemItem"}]},"userNavActiveIndex":-1,"profileTypeName":"latest","isStandaloneEditPage":false,"references":{"User":{"c60270edd10f":{"userId":"c60270edd10f","name":"Manojkumar Muralidharan","username":"manoj.wolfpack","createdAt":1490822629014,"imageId":"1*cXNWh6zSRC8qcRaFA8ZyRg.jpeg","backgroundImageId":"","bio":"","twitterScreenName":"","facebookAccountId":"1086275298175983","allowNotes":1,"mediumMemberAt":1565593200000,"isNsfw":false,"isWriterProgramEnrolled":true,"isQuarantined":false,"isSuspended":false,"type":"User"}},"Post":{"69db7513d3c7":{"id":"69db7513d3c7","versionId":"a18703ccb7d","creatorId":"c60270edd10f","homeCollectionId":"","title":"Hello World","detectedLanguage":"en","latestVersion":"a18703ccb7d","latestPublishedVersion":"a18703ccb7d","hasUnpublishedEdits":false,"latestRev":9,"createdAt":1529107791701,"updatedAt":1529107812772,"acceptedAt":0,"firstPublishedAt":1529107811901,"latestPublishedAt":1529107811901,"vote":false,"experimentalCss":"","displayAuthor":"","content":{"subtitle":"Hi, Testing my feed post on https://manoj.io","postDisplay":{"coverless":true}},"virtuals":{"allowNotes":true,"previewImage":{"imageId":"","filter":"","backgroundSize":"","originalWidth":0,"originalHeight":0,"strategy":"resample","height":0,"width":0},"wordCount":9,"imageCount":0,"readingTime":0.033962264150943396,"subtitle":"Hi, Testing my feed post on https://manoj.io","usersBySocialRecommends":[],"noIndex":false,"recommends":0,"isBookmarked":false,"tags":[],"socialRecommendsCount":0,"responsesCreatedCount":0,"links":{"entries":[{"url":"https://manoj.io","alts":[],"httpStatus":200}],"version":"0.3","generatedAt":1529107812744},"isLockedPreviewOnly":false,"metaDescription":"","totalClapCount":0,"sectionCount":1,"readingList":0,"topics":[]},"coverless":true,"slug":"hello-world","translationSourcePostId":"","translationSourceCreatorId":"","isApprovedTranslation":false,"inResponseToPostId":"","inResponseToRemovedAt":0,"isTitleSynthesized":true,"allowResponses":true,"importedUrl":"","importedPublishedAt":0,"visibility":0,"uniqueSlug":"hello-world-69db7513d3c7","previewContent":{"bodyModel":{"paragraphs":[{"name":"f1db","type":3,"text":"Hello World","markups":[],"alignment":1},{"name":"43ae","type":1,"text":"Hi, Testing my feed post on https://manoj.io","markups":[{"type":3,"start":28,"end":44,"href":"https://manoj.io","title":"","rel":"","anchorType":0}],"alignment":1}],"sections":[{"startIndex":0}]},"isFullContent":true,"subtitle":"Hi, Testing my feed post on https://manoj.io"},"license":0,"inResponseToMediaResourceId":"","canonicalUrl":"","approvedHomeCollectionId":"","newsletterId":"","webCanonicalUrl":"","mediumUrl":"","migrationId":"","notifyFollowers":true,"notifyTwitter":false,"notifyFacebook":false,"responseHiddenOnParentPostAt":0,"isSeries":false,"isSubscriptionLocked":false,"seriesLastAppendedAt":0,"audioVersionDurationSec":0,"sequenceId":"","isNsfw":false,"isEligibleForRevenue":false,"isBlockedFromHightower":false,"deletedAt":0,"lockedPostSource":0,"hightowerMinimumGuaranteeStartsAt":0,"hightowerMinimumGuaranteeEndsAt":0,"featureLockRequestAcceptedAt":0,"mongerRequestType":1,"layerCake":0,"socialTitle":"","socialDek":"","editorialPreviewTitle":"","editorialPreviewDek":"","curationEligibleAt":0,"isProxyPost":false,"proxyPostFaviconUrl":"","proxyPostProviderName":"","proxyPostType":0,"isSuspended":false,"isLimitedState":false,"type":"Post"}},"Social":{"c60270edd10f":{"userId":"lo_Q4poXXxfld7m","targetUserId":"c60270edd10f","type":"Social"}},"SocialStats":{"c60270edd10f":{"userId":"c60270edd10f","usersFollowedCount":18,"usersFollowedByCount":6,"type":"SocialStats"}}},"paging":{"path":"https://medium.com/_/api/users/c60270edd10f/profile/stream","next":{"limit":10,"to":"1529107811901","source":"latest","ignoredIds":[],"page":1}}},"v":3,"b":"38764-a61eb5d"}';


export function getMediumArticles() {
  return fetch('https://medium.com/@manoj.wolfpack/latest?format=json', {
    method: 'GET',
  }).then(response => JSON.parse(cachedRes.substring(cachedRes.indexOf('>') + 1)))
    .then((response) => {
      cache.put('mediumArticles', response, 100000000, (key, value) => {
        console.log('Cache cleared');
      });
      return response;
    });
}

export function fetchMediumArticles() {
  const cacheResult = cache.get('mediumArticles');
  if (!cacheResult) {
    return getMediumArticles();
  }
  return Promise.resolve(cacheResult);
}

export function handleMedium(req, res) {
  const cacheResult = cache.get('mediumArticles');
  if (!cacheResult) {
    getMediumArticles().then((result) => {
      res.json(result);
    });
  } else {
    res.json(cacheResult);
  }
}
