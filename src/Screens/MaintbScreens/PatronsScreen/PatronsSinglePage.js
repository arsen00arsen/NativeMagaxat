import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import HeaderPosts from '../../../Components/PatreonsComponents/HeaderPosts';
import SinglePtareonsContent from '../../../Components/PatreonsComponents/SinglePtareonsContent';
import Gallery from '../../../Components/PatreonsComponents/Gallery';
import ShareIt from '../../../Components/PatreonsComponents/ShareIt';
import PostService from '../../../http/Post/post';

function PatronsSinglePage({route}) {
  const user = route?.params?.user;
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    setLoading(true);
    try {
      const {data} = await PostService.getSinglePost(user.id);
      setPost(data.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.loadings}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <HeaderPosts name={user?.name} />
        <SinglePtareonsContent user={user} post={post} />
        <Gallery post={post?.file} />
        <ShareIt post={post?.description} />
      </View>
    </ScrollView>
  );
}
export default PatronsSinglePage;
const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
