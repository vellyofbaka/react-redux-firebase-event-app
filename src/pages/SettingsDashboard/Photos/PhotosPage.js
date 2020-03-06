import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  useMemo
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFirestoreConnect,
  useFirestore,
  useFirebase
} from 'react-redux-firebase';
import { Segment, Header, Divider, Grid, Button } from 'semantic-ui-react';
import DropzoneInput from './DropZoneInput';
import CropperInput from './CropperInput';
import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
} from '../../../store/actions/userActions';
import { toastr } from 'react-redux-toastr';
import UserPhotos from './UserPhotos';

const PhotosPage = () => {
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const firebase = useFirebase();

  const auth = useSelector(state => state.firebase.auth, []);

  const userPhotosQuery = useMemo(
    () => ({
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }),
    [auth.uid]
  );

  // firestoreConnect equivalent
  useFirestoreConnect(userPhotosQuery);

  // mapstate equivalent

  const profile = useSelector(state => state.firebase.profile, []);
  const loading = useSelector(state => state.async.loading, []);
  const photos = useSelector(state => state.firestore.ordered.photos, []);

  // actions equivalent
  const [files, setFiles] = useState([]);
  const [cropResult, setCropResult] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
      URL.revokeObjectURL(cropResult);
    };
  }, [files, cropResult]);

  const handleUploadImage = useCallback(async () => {
    try {
      await dispatch(uploadProfileImage({ firebase, firestore }, image));
      handleCancelCrop();
      toastr.success('성공', '사진이 업로드 되었습니다');
    } catch (error) {
      console.log(error);
      toastr.error('실패', '정상적으로 업로드 되지 않았습니다');
    }
  }, [dispatch, firebase, firestore, image]);

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
    setCropResult('');
  };

  const handleDeletePhoto = useCallback(
    async photo => {
      try {
        await dispatch(deletePhoto({ firebase, firestore }, photo));
      } catch (error) {
        toastr.error('failed', error.message);
      }
    },
    [dispatch, firebase, firestore]
  );

  const handleSetMainPhoto = useCallback(
    async photo => {
      try {
        await dispatch(setMainPhoto({ firebase, firestore }, photo));
      } catch (error) {
        toastr.error('failed', error.message);
      }
    },
    [dispatch, firebase, firestore]
  );

  return (
    <Segment>
      <Header dividing size="large" content="프로필 사진" />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header sub color="grey" content="1 단계 - 사진 추가" />
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="grey" content="2 단계 - 이미지 사이즈 조정" />
          {files.length > 0 && (
            <CropperInput
              imagePreview={files[0].preview}
              setImage={setImage}
              setCropResult={setCropResult}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="grey" content="3 단계 - 프리뷰 & 업로드" />
          {files.length > 0 && (
            <Fragment>
              <div
                className="img-preview"
                style={{
                  minHeight: '200px',
                  minWidth: '200px',
                  overflow: 'hidden'
                }}
              />
              <Button.Group>
                <Button
                  loading={loading}
                  onClick={handleUploadImage}
                  style={{ width: '100px' }}
                  positive
                  icon="check"
                />
                <Button
                  disabled={loading}
                  onClick={handleCancelCrop}
                  style={{ width: '100px' }}
                  icon="close"
                />
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>

      <Divider />
      <UserPhotos
        photos={photos}
        profile={profile}
        deletePhoto={handleDeletePhoto}
        setMainPhoto={handleSetMainPhoto}
        loading={loading}
      />
    </Segment>
  );
};
export default PhotosPage;
