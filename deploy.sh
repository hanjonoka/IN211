#! /bin/bash
cd frontend
npm run build
cd ..
cp -r frontend/build/* backend/public/
git add *
git commit -m "copied front build to back"
git push heroku