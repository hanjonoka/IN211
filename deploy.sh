#! /bin/bash
cd frontend
npm run build
cd ..
rm -rf backend/public
cp -R frontend/build/ backend/public/
git add *
git commit -m "Deploy new version"
git push heroku