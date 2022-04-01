import * as admin from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp } from 'firebase-admin/app'



export class FirebaseService {
  private static instance: FirebaseService;

  db: admin.firestore.Firestore;
  auth: admin.auth.Auth;
  //admin: any

  constructor() {
    const serviceAccount: any = {
      type: "service_account",
      project_id: "content-microservice-4cb35",
      private_key_id: "9073d491aa518c1b0ee08311e57be2a39215d2b6",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDXF+y6nI9dRp3j\nJSsegJ+Cjx4SqzuENNIzkYYheCmg9RQvXGv0sd4flJ1IJNCIdVdFEnvgbJiHQgtQ\nA+n7g38WNsQKQMwv46b9bOBgYMM0AAkK+usZdn5Yj4+5wciX5ieyAT0cjTK+h24y\nuoGdvRd/vYigSSiBg45XtAdKnp75l++1boKtUeJonqoTHB3Ng8Jk0KBqNGVbwCS6\nBUq2rJT2UUW9N5jqeS2D0lrIy3E9cr0c4joi9c2bb0YkJIqwAKMXimMpTLc8F8xD\nGcNOwj1Fvz6+6C+pQH/XQEw7RsKAQPJxDJjS4Ou6yFZHAn4aUZ06wfHN+9ftwl4Z\nbTsRJAXdAgMBAAECggEAICvhlOPX2aFh+i3UA42aI21ZQnzpZlPUNjGyTeKVhLqY\nw0tf5ks4Uvbn3iOLgULebmQJB+nrl8d8E61nhjQGgoG8frVvFPadl9LSGKLrGiWr\nNJY6gHt7AwSuAEsIwBeE9m3oVb3qH29NlI7VgOIIgsBhkBUr1tCg2Lis99npI0xH\nsBv/rFUAfGsnAjbKOi17zpOdl3O0Ow3YaZvn2m1+Eu1Fz3qRRWsPKr7w4rlSvewo\nFLWcHHfS1oBJRSrllxuAcMzMMLX2RXjzeDMJwM7qEFvWcuHAuBGCeRwKw8ItF6/a\ntI4KE5kZtoeie1BjJ/vqP6Nha39LIiaVfEOaIcSKzQKBgQD8Pce+IXEDweLRjf9Q\nuVbedX7uZyJdKyDVqi6ulOvMvdG6+xAT1ZK8tMeIAXGLu2k/2T+sc6BxAkce3kGR\n4dLSVjiNlVHUUSnFx1SbJuSscm6FDqoU0FD2RZs1YkUIjaCGgSEX/A1q2OwwcgMg\nX3ycLNGC80a7fsiKq22epT3odwKBgQDaTG/wJKZAk4EXLASUbv0xns8lBq8llfFN\nNpGvj/RbdjXkdO1xolZH/EgO4YOgdXyMcy7sltjJusGpcR0CLBuiCLcYi1BtHQqA\nkqtmFwvvH8BcHw6lCrCZvHHTjSY7Zpn8nn8GrUm9rFAGc0qaeaTiHBPn8yRv0dnB\nhtC41/wtSwKBgQDim6of0LFUW9ImyvftkKRPNKV1Dmib5QwZiEtqAlYY2QtbfQQD\nnaK3L332XL2ieBrlBoqipjokbJRyUd/8bDFXT6h84gHiyYvKp/oFbRqRJjjOBs+b\n5U5nAT+f5Qn51iq5y7Zscr+nFvyRxUuzwLUVJVqP13jbJtqJYdsYZIFKnwKBgQC5\nZ95Sye3iPuWPNrWVFEc7k7Q/sFOlypotiEFoKQ3TeK0BIkZhEw3RCfZxnRvcdqyX\n5WRfUSdC/rlpHkcTBz9Y+an40Ko4Ykf/N5MXnE9og0EvfLlFd7TSffj3QpTMMrJq\nmnsswpU04Vr+f4FHfjWKTWqiwCGcT1FxSv2PYPIvzQKBgQCDz5ppNyPAyVHuLE6t\nPx7fWDOGH2xN/7eHtJLHgTN/GWzNG35bZfMvQKluD0NgnTn9HNiKt8fPlCK9yPcw\nJNNFdlLuFBLWsAeTBpEGSR/8cZm/6kcH/aqRIv1gDtFF5KRTJBg82Lr5Q3+Y0qHZ\n4JoNgHNXwY/lWJEHcPiFdhpNOA==\n-----END PRIVATE KEY-----\n",
      client_email: "firebase-adminsdk-h05ro@content-microservice-4cb35.iam.gserviceaccount.com",
      client_id: "103562583560261427997",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h05ro%40content-microservice-4cb35.iam.gserviceaccount.com"
    };

    initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });


    this.db = getFirestore();

    console.log("Created new instance of FirestoreService");
  }

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }
}
